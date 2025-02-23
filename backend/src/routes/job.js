const express = require("express");
const jobRouter = express.Router();
const Job = require("../models/job");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth");
const jwtSecret = process.env.JWT_SECRET;

jobRouter.post("/job/add", userAuth, async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      postedBy: req.user._id,
    });

    const savedJob = await job.save();
    res.json(savedJob);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
 
jobRouter.get("/feed", async (req, res) => {
  try {
    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .populate("postedBy", "name email");
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

 
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

jobRouter.get("/search", async (req, res) => {
  try {
    const { searchTerm, skills } = req.query;
    let query = {};

  
    if (searchTerm) {
      query.$or = [
        { companyName: { $regex: searchTerm, $options: "i" } },
        { jobPosition: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
      ];
    }

   
    if (skills) {
      const skillsArray = skills.split(",").map((skill) => skill.trim());
      query.skillsRequired = { $all: skillsArray };
    }

    if (req.user && req.user._id) {
      query.postedBy = req.user._id;
      console.log("Searching only own jobs for:", req.user.name);
    } else {
      console.log("Searching all available jobs.");
      
    }

    const jobs = await Job.find(query);

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

jobRouter.get("/skills", async (req, res) => {
  try {
    const skills = await Job.distinct("skillsRequired");
    res.status(200).json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = jobRouter;
