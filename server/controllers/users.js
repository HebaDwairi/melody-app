const router = require('express').Router();
const User = require('../models/user');
const Melody = require('../models/melody');
const bcrypt = require('bcrypt');

router.get('/', async(request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('melodies', {
        notes: 1, 
        userNotes: 1,
        correct: 1,
        accuracy: 1,
        result: 1,
      });
    response.json(users);
  }
  catch (err) {
    next(err);
  }
});

router.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const user = await User.findById(id).populate('melodies', {
      notes: 1, 
      userNotes: 1,
      correct: 1,
      accuracy: 1,
      result: 1,
    });
    response.json(user);
  }
  catch (err) {
    next(err);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const {username, name, password} = request.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      name,
      passwordHash
    });

    const user = await newUser.save();
    response.status(201).json(user);
  }
  catch (err) {
    next(err);
  }
});

router.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    await User.findByIdAndDelete(id);
    response.status(204).end();
  }
  catch (err) {
    next(err);
  }
});

router.put('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const obj = request.body;
    const user = await User.findByIdAndUpdate(id, obj);
    response.json(user);
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
