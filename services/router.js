const express = require('express');
const router = new express.Router();
const acc_percent = require('../controllers/acc_percent.js');
const state_ranking = require('../controllers/state_ranking.js');
const graph_results = require('../controllers/graph_results.js');
const graph_results_jan = require('../controllers/graph_results_jan.js');
const graph_results_feb = require('../controllers/graph_results_feb.js');
const graph_results_mar = require('../controllers/graph_results_mar.js');
const graph_results_apr = require('../controllers/graph_results_apr.js');
const graph_results_may = require('../controllers/graph_results_may.js');
const graph_results_jun = require('../controllers/graph_results_jun.js');
const graph_results_jul = require('../controllers/graph_results_jul.js');
const graph_results_aug = require('../controllers/graph_results_aug.js');
const graph_results_sep = require('../controllers/graph_results_sep.js');
const graph_results_oct = require('../controllers/graph_results_oct.js');
const graph_results_nov = require('../controllers/graph_results_nov.js');
const graph_results_dec = require('../controllers/graph_results_dec.js');
const map_results = require('../controllers/map_results.js');
 
router.route('/accident_percentage')
  .post(acc_percent.post_select);

router.route('/state_ranking')
  .post(state_ranking.post_select);

router.route('/graph_results')
  .post(graph_results.post_select);

router.route('/graph_results_jan')
  .post(graph_results_jan.post_select);

router.route('/graph_results_feb')
  .post(graph_results_feb.post_select);

router.route('/graph_results_mar')
  .post(graph_results_mar.post_select);

router.route('/graph_results_apr')
  .post(graph_results_apr.post_select);

router.route('/graph_results_may')
  .post(graph_results_may.post_select);

router.route('/graph_results_jun')
  .post(graph_results_jun.post_select);

router.route('/graph_results_jul')
  .post(graph_results_jul.post_select);

router.route('/graph_results_aug')
  .post(graph_results_aug.post_select);

router.route('/graph_results_sep')
  .post(graph_results_sep.post_select);

router.route('/graph_results_oct')
  .post(graph_results_oct.post_select);

router.route('/graph_results_nov')
  .post(graph_results_nov.post_select);

router.route('/graph_results_dec')
  .post(graph_results_dec.post_select);

router.route('/map_results')
  .post(map_results.post_select);

module.exports = router;