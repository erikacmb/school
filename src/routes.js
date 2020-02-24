const express = require('express');
const CourseController = require('./controllers/CourseController');
const StudentController = require('./controllers/StudentController');
const CertificateController = require('./controllers/CertificateController');
const routes = express.Router();

// home
routes.get('/', (req, res) => { 
  return res.json({ message: 'Hello world'});
});

// list all courses
routes.get('/courses', CourseController.list);

// create course 
routes.post('/courses', CourseController.store);

// list all students
routes.get('/students', StudentController.list);

// create student
routes.post('/students', StudentController.store);

// create certificate for student
routes.post('/students/:document/certificate', CertificateController.store);

module.exports = routes;