var express = require('express');
var router = express.Router();

router.get('/*', function (req, res) {
  var postQuery = require('../app');
  postQuery().then((datas) => {
      res.send( JSON.stringify(datas.rows) );
  }).catch((error) => {
      console.log(error);
  });
})

module.exports = router;