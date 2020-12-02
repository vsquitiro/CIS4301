const express = require('express');
const router = new express.Router();
const acc_percent = require('../controllers/acc_percent.js');
const state_ranking = require('../controllers/state_ranking.js');
const graph_results = require('../controllers/graph_results.js');
const map_results = require('../controllers/map_results.js');
const count = require('../controllers/count.js');
 
router.route('/accident_percentage')
  .post(acc_percent.post_select);

router.route('/state_ranking')
  .post(state_ranking.post_select);

router.route('/graph_results')
  .post(graph_results.post_select);

router.route('/map_results')
  .post(map_results.post_select);

router.route('/count')
  .post(count.post_select);

module.exports = router;