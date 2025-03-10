const mongoose = require('mongoose');

const melodySchema = new mongoose.Schema({
  notes: [{
    type: String,
    required: true,
  }],
  userNotes: [{
    type: String,
    required: true,
  }],
  scale: String,
  correct: Number,
  accuracy: Number,
  result:String,
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
},
{
  timestamps: true,
});

melodySchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id;
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

const melodyModel = mongoose.model('Melody', melodySchema);

module.exports = melodyModel;