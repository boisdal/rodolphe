const router = require('express').Router();
const requestHandler = require('./request-handler.js');

router.get('/list', requestHandler.getFileTree);

module.exports = router;