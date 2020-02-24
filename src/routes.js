const express = require('express');
const CourseController = require('./controllers/CourseController');
const StudentController = require('./controllers/StudentController');
const routes = express.Router();

// home
routes.get('/', (req, res) => { 
  return res.json({ message: 'Hello world'});
});



// create course 
routes.post('/courses', CourseController.store);

// create student
routes.post('/students', StudentController.store);

module.exports = routes;