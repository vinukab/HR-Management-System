const express = require('express');
const {
  getJobTitles,
  getPayGrades,
  getSupervisors,
  getDepartments,
  getBranches,
} = require('../controllers/enumController');

const enumRouter = express.Router();

enumRouter.get('/job-titles', getJobTitles);
enumRouter.get('/pay-grades', getPayGrades);
enumRouter.get('/supervisors', getSupervisors);
enumRouter.get('/departments', getDepartments);
enumRouter.get('/branches', getBranches);

module.exports = {enumRouter};
