const express = require('express');
const router = express.Router();
const articleRouter = require('./article');
module.exports = router;

router.use('/',
articleRouter
);
