const express = require('express'),
  router = express.Router();

// export router
module.export = router;


// define routes
router.get('/test', (req, res) => {
  res.send('Hello, I am the application!');
});