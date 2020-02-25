const express = require('express');
const CourseController = require('./controllers/CourseController');
const StudentController = require('./controllers/StudentController');
const CertificateController = require('./controllers/CertificateController');
const routes = express.Router();

// const middleware = (req, res, next) => { 
//   console.log('middleware');
//   return next();
// }

/*----------- COURSES -----------*/

// list all
routes.get('/courses', CourseController.list);

// create
routes.post('/courses', CourseController.store);

/*----------- STUDENTS -----------*/

// list all
routes.get('/students', StudentController.list);

// create
routes.post('/students', StudentController.store);

/*----------- CERTIFICATES -----------*/

// create certificate for student
routes.post('/certificate/:document', CertificateController.store);

// verify if certificate is valid WIP
routes.get('/certificate/:token', CertificateController.verify);


module.exports = routes;