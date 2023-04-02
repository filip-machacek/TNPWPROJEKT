const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  street: {
    type: String
  },
  house_number: {
    type: Number
  },
  city: {
    type: String
  },
  postcode: {
    type: Number
  },
  position: {
    type: String
  },
  company: {
    type: String
  },
  department: {
    type: String
  },
  note: {
    type: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
