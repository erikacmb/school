const Certificate = require('../models/Certificate');
const Student = require('../models/Student');

const generateToken = () => {
  return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = { 
  async store(req, res) { 
    const { document } = req.params; 
    const student = await Student.findOne({ document });
    if (!student) { 
      return res.status(404).json ({ status: 404, message: 'User not found'})
    } else { 

      const token = generateToken();
      
      const certificate = await Certificate.create({ 
        token,
        slug: req.body.slug,
        student_id: student._id,
        date: "01/02/2020"
      });

      const studentUpdated = await Student.update(
        { _id: student._id }, 
        { $push: { certificates: certificate._id }}
      );
      
      return res.json(studentUpdated);
    }
    
  }
};