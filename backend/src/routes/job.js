const express = require("express");
const jobRouter = express.Router();
const Job = require("../models/Job");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth");
const jwtSecret = process.env.JWT_SECRET;

// Post a job (requires authentication)
jobRouter.post("/job/add", userAuth, async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      postedBy: req.user._id, // Use the user ID from the token
    });

    const savedJob = await job.save();
    res.json(savedJob);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all jobs (publicly accessible)
jobRouter.get("/feed", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).populate('postedBy', 'name email');;
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Get job by ID
jobRouter.get("/job/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Edit job
jobRouter.patch("/job/edit/:id", userAuth, async (req, res) => {
  try { 
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ message: "Job updated successfully", job });
  } catch (err) {
    console.error(err.message);
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid job ID" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// 🔍 Search & Filter Jobs
jobRouter.get("/search", async (req, res) => {
  try {
    const {
      searchTerm,
      skills,
      page = 1,
      limit = 10,
      sort = "createdAt",
    } = req.query;

    let query = {};

    // 🔍 1️⃣ Search by Company, Position, Description, or Location
    if (searchTerm) {
      query.$or = [
        { companyName: { $regex: searchTerm, $options: "i" } },
        { jobPosition: { $regex: searchTerm, $options: "i" } },
        // { jobDescription: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // 🎯 2️⃣ Filter by Skills (Array Match)
    if (skills) {
      const skillsArray = skills
        .split(",")
        .map((skill) => new RegExp(skill.trim(), "i"));
      query.skillsRequired = { $in: skillsArray };
    }

    // 🚀 3️⃣ Pagination & Sorting
    const jobs = await Job.find(query)
      .sort({ [sort]: -1 }) // Sort by createdAt (descending order)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(jobs);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = jobRouter;
