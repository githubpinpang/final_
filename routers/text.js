const express = require('express');
const router = express.Router();
const Texts = require('../controllers/text');


router.get('', Texts.getAllTexts);
router.post('', Texts.registerText);
router.delete('', Texts.deleteTexts);
router.put('', Texts.updateTextRecs);
router.get('', Texts.getTextsById);

  
  module.exports = router;


