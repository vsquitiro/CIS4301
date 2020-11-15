const employees = require('../db_apis/employees.js');
 
async function get(req, res, next) {
  try {
    const context = {};
 
    context.id = parseInt(req.params.id, 10);
 
    const rows = await employees.find(context);
 
    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

async function get_select(req, res, next) {
  try {
    const context = {};

    // console.log(req.query.att);
    context.proj = req.query.proj;
    context.att = req.query.att;
    context.con = req.query.con;

    // context.id = parseInt(req.params.id, 10);
 
    const rows = await employees.select_statement(context);
 
    if (rows.length === 0) {
       res.status(404).end();
      } else {
        res.status(200).json(rows);
      }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;

module.exports.get_select = get_select;