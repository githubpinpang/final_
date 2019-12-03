const express = require('express');
const router = express.Router();
const Users = require('../controllers/user');


router.get('', Users.getAllUsers);
router.post('', Users.registerUser);
router.delete('', Users.deleteMember);
router.put('', Users.updateMember);
router.get('', Users.getUserById);

  
  module.exports = router;


