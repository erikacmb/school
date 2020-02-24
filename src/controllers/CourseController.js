const Course = require('../models/Course');
module.exports = { 
  async store(req, res) { 
    const { name, description, instructors, keywords, price, hours, enrolled, approved } = req.body;
    const courseExists = await Course.findOne({ name: req.body.name });
    if (courseExists) { 
      return res.json(courseExists);
    } 
    const course = await Course.create({ 
      name,
      description,
      instructors,
      keywords,
      price,
      hours,
      enrolled,
      approved
    });
    return res.json(course);
  }
};