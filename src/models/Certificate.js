const { Schema, model } = require('mongoose');

const CertificateSchema = new Schema({ 
  token: { 
    type: String,
    required: true
  },
  slug: { 
    type: String,
    required: true
  },
  student_id: { 
    type: String,
    required: true
  },
  date: { 
    type: String,
    required: true
  }
}, { 
  timestamps: true
});

module.exports = model('Certificate', CertificateSchema);