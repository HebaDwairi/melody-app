const router = require('express').Router();

router.get('/greet', (request, response) => {
  response.json({greeting: "hellooooo"});
});

module.exports = router;
