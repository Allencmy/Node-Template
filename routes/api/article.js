const express = require('express');
const router = express.Router();
// services
const articleService = require('../../services/article');

module.exports = router;

router.get('/articles', (req, res) => {
  const params = req.query;
  console.log('params', params);
  console.log('req.query', req.query);
  articleService.getArticle(params)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get('/articles/:id', (req, res) => {
  const id = req.params.id;
  articleService.getArticleDetail(id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
