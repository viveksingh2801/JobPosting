const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    logoUrl: { type: String },
    jobPosition: { type: String, required: true },
    monthlySalary: { type: Number, required: true },
    jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], required: true },
    remoteOrOffice: { type: String, enum: ['Remote', 'Office'], required: true },
    location: { type: String },
    jobDescription: { type: String, required: true },
    aboutCompany: { type: String },
    skillsRequired: { type: [String] }, // Array of skills
    additionalInformation: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  
}, {
    timestamps: true  
});

module.exports = mongoose.model('Job', jobSchema);
