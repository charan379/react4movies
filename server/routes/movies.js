const express = require('express');
const router = express.Router();



// get movies

router.get('/', function(req, res, next){
    res.send(" / movies - working")
});

module.exports = router;