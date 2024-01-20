export default class JobModel {
  constructor(id, name, desc, salary, resumePath = '') {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.salary = salary;
    this.resumePath = resumePath;
  }

  static getAll() {
    return jobs;
  }

  static update(jobObj) {
    const index = jobs.findIndex((p) => p.id == jobObj.id);
    jobs[index] = jobObj;
  }

  static delete(id) {
    const index = jobs.findIndex((p) => p.id == id);
    jobs.splice(index, 1);
  }

  static add(name, desc, salary, resumePath = '') {
    let newJob = new JobModel(
      jobs.length + 1,
      name,
      desc,
      salary,
      resumePath
    );
    jobs.push(newJob);
  }

  static getById(id) {
    return jobs.find((p) => p.id == id);
  }
 
}

var jobs = [
  new JobModel(
    1,
    'Software Engineer 1',
    'Description for SDE1',
    2000000,
    '/resume-path/sde1_resume.pdf'
  ),
  new JobModel(
    2,
    'Product Owner',
    'Description for Product Owner',
    1000000,
    '/resume-path/product_owner_resume.pdf'
  ),
  new JobModel(
    3,
    'Admin',
    'Description for Admin',
    399900,
    '/resume-path/admin_resume.pdf'
  ),
];
export class JobApplicant {
  constructor(id, name, mobile, address, resumePath = '') {
    this.id = id;
    this.name = name;
    this.mobile = mobile;
    this.address = address;
    this.resumePath = resumePath;
  }
  static add(name, mobile, address, resumePath = '') {
    let newJob = new JobModel(
      jobs.length + 1,
      name,
      mobile,
      address,
      resumePath
    );
    applicants.push(newJob);
  }
  static getAll(){
    return applicants;
  }
}
export var applicants=[];