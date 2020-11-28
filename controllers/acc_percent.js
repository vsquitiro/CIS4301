const acc_percent = require('../db_apis/acc_percent.js');

async function get_select(req, res, next) {
  try {
    const context = {};

    console.log(req.body);

    // known parameters
    context.search_params = req.body.search_params;
 
    const rows = await acc_percent.select_statement(context.search_params);
 
    if (rows.length === 0) {
       res.status(404).end();
      } else {
        res.status(200).json(rows);
      }
  } catch (err) {
    next(err);
  }
}

module.exports.get_select = get_select;