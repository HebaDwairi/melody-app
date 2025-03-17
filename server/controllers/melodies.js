const router = require('express').Router();
const User = require('../models/user');
const Melody = require('../models/melody');
const userExtractor = require('../utils/middleware').userExtractor;

router.get('/', async (request, response, next) => {
  try {
    const melodies = await Melody
      .find({})
      .populate('user', {
        name: 1,
        username: 1,     
      });
    
    response.json(melodies);
  }
  catch (error) {
    next(error);
  }
});

router.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const melody = await Melody
      .findById(id)
      .populate('user', {
        name: 1,
        username: 1,     
      });
    
    response.json(melody);
  }
  catch (error) {
    next(error);
  }
});

router.post('/', userExtractor, async (request, response, next) => {
  try {
    const user = request.user;
    if(!user) {
      return response.status(403).json({error: 'user missing'});
    }

    const melody = new Melody({
      ...request.body,
      user: user._id,
    });
    
    user.melodies = user.melodies.concat(melody._id);
    await user.save();

    const savedMelody = await melody.save();
    response.status(201).json(savedMelody);
  }
  catch (error) {
    next(error);
  }
});


router.delete('/', userExtractor ,async (request, response, next) => {
  try {
    const user = request.user;
    if(!user) {
      return response.status(403).json({error: 'user missing'});
    }

    await Melody.deleteMany({user: user._id});
    
    user.melodies = [];
    await user.save();

    response.status(204).end();
  }
  catch (error) {
    next(error);
  }
});

router.get('/user/:id', userExtractor, async (request, response, next) => {
  try {
    const user = request.user;
    if(!user) {
      return response.status(403).json({error: 'user missing'});
    }

    if(!user.id === request.params.id) {
      return response.status(403);
    }

    const melodies = await Melody.find({ user: user.id });
    response.json(melodies);
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;