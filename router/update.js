var express = require('express');
var postQuery = require('../action/app');
var router = express.Router();

router.post('/*', function (req, res) {
  var tableName = req.params[0];
  var params = req.body;
  postQuery('update', tableName, params).then((datas) => {
      res.send( JSON.stringify(datas.rows) );
  }).catch((error) => {
      res.status(400).send(JSON.stringify(error));
  });
})

module.exports = router;