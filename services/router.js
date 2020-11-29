const express = require('express');
const router = new express.Router();
const acc_percent = require('../controllers/acc_percent.js');
const state_ranking = require('../controllers/state_ranking.js')
const graph_results = require('../controllers/graph_results.js')
 
router.route('/accident_percentage')
  .post(acc_percent.post_select);

router.route('/state_ranking')
  .post(state_ranking.post_select);

router.route('/graph_results')
  .post(graph_results.post_select);

module.exports = router;