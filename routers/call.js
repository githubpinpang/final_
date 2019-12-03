const express = require('express');
const router = express.Router();
const Calls = require('../controllers/call');


router.get('', Calls.getAllCalls);
router.post('', Calls.registerCall);
router.delete('', Calls.deleteCallRecord);
router.put('', Calls.updateCallRec);
router.get('', Calls.getCallsById);

  
  module.exports = router;


