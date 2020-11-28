const express = require('express');
const router = new express.Router();
const acc_percent = require('../controllers/acc_percent.js');
 
router.route('/accident_percentage')
  .get(acc_percent.get_select);

module.exports = router;