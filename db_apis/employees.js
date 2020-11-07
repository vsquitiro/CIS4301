const database = require('../services/database.js');
 
const baseQuery = 
 `select * from squitiro.employee`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.emplid = context.id;
 
    query += `\nwhere emplid = :emplid`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;