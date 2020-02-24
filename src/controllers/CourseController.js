const Course = require('../models/Course');
module.exports = { 

  async list(req, res) { 
    const courses = await Course.find();
    return res.json(courses);
  },

  async store(req, res) { 
    const { name, slug, description, instructors, keywords, price, hours, enrolled, approved } = req.body;
    const courseExists = await Course.findOne({ name: req.body.name });
    if (courseExists) { 
      return res.json(courseExists);
    } 
    const course = await Course.create({ 
      name,
      slug,
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