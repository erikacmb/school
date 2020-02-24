const Student = require('../models/Student');
module.exports = { 

  async list(req, res) { 
    const students = await Student.find();
    return res.json(students);
  },

  async store(req, res) { 
    const { name, email, document, certificates } = req.body;
    const studentExists = await Student.findOne({ document: req.body.document });
    if (studentExists) { 
      return res.json(studentExists);
    } 
    const student = await Student.create({ 
      name,
      email,
      document,
      certificates
    });
    return res.json(student);
  }
};