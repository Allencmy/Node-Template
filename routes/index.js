const express = require('express');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
  console.log(1);
  res.render('index');
});
