import UserModel from '../models/user.model.js';
import JobModel from '../models/job.model.js';

export default class UserController {
  getRegister(req, res) {
    res.render('register');
  }
  getCandidateRegister(req, res) {
    res.render('candidate-register',{errorMessage: null});
  }
  getLogin(req, res) {
    res.render('recruiter-login', { errorMessage: null });
  }
  getCandidateLogin(req, res) {
    res.render('candidate-login', { errorMessage: null });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    res.render('recruiter-login', { errorMessage: null });
  }
  

  postCandidateRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    res.render('candidate-login', { errorMessage: null });
  }
  postLogin(req, res) {
    const { email, password } = req.body;
    
    const user = UserModel.isValidUser(
      email,
      password
    );
    console.log(user);
    if (!user) {
      return res.render('recruiter-login', {
        errorMessage: 'Invalid Credentials',
      });
    }
    req.session.user = user;
    
    var jobs = JobModel.getAll();
    res.render('index', { jobs });
  }
  postCandidateLogin(req, res) {
    const { email, password } = req.body;
    
    const user = UserModel.isValidUser(
      email,
      password
    );
    console.log(user);
    if (!user) {
      return res.render('candidate-login', {
        errorMessage: 'Invalid Credentials',
      });
    }
    req.session.user = user;
    
    var jobs = JobModel.getAll();
    res.render('candidate', { jobs });
  }
}
