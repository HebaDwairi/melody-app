const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (request, response, next) => {
  try {
    const {username, password} = request.body;
    const user = await User.findOne({username: username});

    const correctPassword = user === null ? false: 
      await bcrypt.compare(password, user.passwordHash);

    if(!user || !correctPassword) {
      response.status(401).json({error: 'incorrect username or password'});
    }

    const tokenObject = {
      id: user._id,
      name: user.name,
      username: user.username,
    }

    const token = jwt.sign(tokenObject, process.env.JWT_SECRET);
    response.status(200).json({
      token: token,
      username: user.username,
      name: user.name,
    });
  }
  catch (error) {
    next(error);
  }
});