const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  passwordHash: String,
  melodies: {
    type:mongoose.SchemaTypes.ObjectId,
    ref: 'Melody',
  }
});

userSchema.set('toJSON', (document, returnedObj) => {
  returnedObj.id = returnedObj._id;
  delete returnedObj._id;
  delete returnedObj.__v;
  delete returnedObj.passwordHash;
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;