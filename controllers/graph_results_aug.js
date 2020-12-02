const graph_results_aug = require('../db_apis/graph_results_aug.js');

async function post_select(req, res, next) {
  try {
    const context = {};

    // known parameters
    context.search_params = req.body.search_params;

    console.log(context.search_params);
 
    const rows = await graph_results_aug.select_statement(context.search_params);
 
    if (rows.length === 0) {
       res.status(404).end();
      } else {
        res.status(200).json(rows);
      }
  } catch (err) {
    next(err);
  }
}

module.exports.post_select = post_select;