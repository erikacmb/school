const Certificate = require('../models/Certificate');
const Student = require('../models/Student');
const QRCode = require('qrcode');
var generatedQRCode;

const generateToken = () => {
  return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const generateQRCode = (token) => { 
  // change base URL here
  QRCode.toDataURL(`http://6ecf1f2a.ngrok.io/certificate/${token}`, function (err, url) {
    generatedQRCode = url;
  });
}

module.exports = { 

  async store(req, res) { 

    const { document } = req.params; 
    const { slug, date } = req.body;
    const student = await Student.findOne({ document });

    if (!student) { 
      return res.status(404).json ({ status: 404, message: 'User not found'})
    } else { 
      const token = generateToken();
      generateQRCode(token);

      const repeatedCertificate = await Certificate.findOne({ slug });

      if (repeatedCertificate) { 
        return res.json(student); 
      } else { 
        //create certificate
        const certificate = await Certificate.create({ 
          token,
          slug,
          student_id: student._id,
          date
        });
        // update student with certificate id
        const studentUpdated = await Student.updateOne(
          { _id: student._id }, 
          { $push: { certificates: certificate._id }}
        );
        
        if (studentUpdated) { 
          return res.json({ qrcode: generatedQRCode });
        } else { 
          return res.status(400).json ({ status: 400, message: 'An error happened'})
        }
      }
    }
    
  }, 
  async verify (req, res) { 
    const { token } = req.params;
    const certificate = await Certificate.findOne({ token });
    if (certificate) { 
      return res.json(certificate);
    } else { 
      res.status(404).json({ status: 404, message: 'Certificate not found'});
    }
  }
};