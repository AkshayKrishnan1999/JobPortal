import JobModel, { JobApplicant, applicants } from "../models/job.model.js";

import multer from "multer";
const upload = multer({ dest: 'uploads/' });
class JobsController {
  getJobs(req, res, next) {
    var jobs = JobModel.getAll();
    res.render('index', { jobs });
  }
  getWelcome(req,res,next)
  {
    res.render('landing');
  }

  getAddJob(req, res, next) {
    res.render('add-job', {
      errorMessage: null,
    });
  }

  postAddJob(req, res) {
    const { name, desc, salary } = req.body;
    
    upload.single('resume')(req, res, (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      const resumePath = req.file ? req.file.path : '';
  
      JobModel.add(name, desc, salary, resumePath);
      const jobs = JobModel.getAll();
      
      res.render('index', { jobs });
    });
  }
  postAddApplication(req,res)
  {
    const {name,mobilenumber,address} = req.body;
    upload.single('resume')(req, res, (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      const resumePath = req.file ? req.file.path : '';
  
      JobApplicant.add(name, mobilenumber, address, resumePath);
      const jobs = JobApplicant.getAll();
      
      res.render('applications', { applicants });
    });
    
  }
  getUpdateJobView(req, res, next) {
    const id = req.params.id;
    const jobFound = JobModel.getById(id);
    if (jobFound) {
      res.render('update-job', {
        job: jobFound,
        errorMessage: null,
      });
    } else {
      res.status(404).send('Job not found');
    }
  }
  applyJob(req,res)
  {
    const jobId = req.query.jobId ; 

  res.render('apply-job', { jobId , errorMessage:' '});
  }
  postUpdateJob(req, res) {
    const { id, name, desc, salary } = req.body;
    const jobFound = JobModel.getById(id);

    if (!jobFound) {
      return res.status(404).send('Job not found');
    }

    // Assuming Multer middleware has stored the resume file path in req.file.path
    const resumePath = req.file ? req.file.path : jobFound.resumePath;

    const updatedJob = {
      id,
      name,
      desc,
      salary,
      resumePath,
    };

    JobModel.update(updatedJob);

    var jobs = JobModel.getAll();
    res.render('index', { jobs });
  }

  deleteJob(req, res) {
    const id = req.params.id;
    const jobFound = JobModel.getById(id);

    if (!jobFound) {
      return res.status(404).send('Job not found');
    }

    JobModel.delete(id);
    var jobs = JobModel.getAll();
    res.render('index', { jobs });
  }
}

export default JobsController;
