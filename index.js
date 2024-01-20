import express from 'express';
import JobsController from './src/controllers/job.controller.js';
import UserController from './src/controllers/user.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import session from 'express-session';
import bodyParser from 'body-parser'; 
import { isAuthenticated } from './src/middlewares/auth.js';
import multer from 'multer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(bodyParser.json()); 
app.use(express.static('public'));
app.use(session({
  secret: 'SecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { domain: "localhost", httpOnly: true },
}));

const jobsController = new JobsController();
const usersController = new UserController();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
});
const upload = multer({ storage: storage });

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

app.get('/', jobsController.getWelcome);
app.get('/register', usersController.getRegister);
app.get('/recruiterlogin', usersController.getLogin);
app.post('/recruiterlogin', usersController.postLogin);
app.post('/register', usersController.postRegister);
app.post('/add-job', isAuthenticated, jobsController.postAddJob);
app.get('/jobs', isAuthenticated, jobsController.getJobs);
app.get('/add-job', jobsController.getAddJob);
app.get('/candidatelogin',usersController.getCandidateLogin);
app.post('/candidate-login', usersController.postCandidateLogin);
app.get('/candidate-register',usersController.getCandidateRegister); 
app.post('/candidate/register',usersController.postCandidateRegister); 
app.get('/update-job/:id', jobsController.getUpdateJobView);
app.post('/delete-job/:id', jobsController.deleteJob);
app.post('/update-job', jobsController.postUpdateJob);
app.get('/apply-for-job',jobsController.applyJob );
app.post('/submit-application',jobsController.postAddApplication );

app.get('/download-resume', (req, res) => {
  const filename = req.params.filename;

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(__dirname, 'uploads', filename);

  res.download(filePath, filename);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
