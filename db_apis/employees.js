const database = require('../services/database.js');
 
const baseQuery = 
 `select * from bd1.accident`;
 
const testTable = `bd1.accident`;

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

async function select_statement(context) {
  let query = baseQuery;

  proj = '*';

  if(context.proj) {
    proj = context.proj;
  }

  if (context.att && context.con) {
    query = `select ` + proj + ` from bd1.accident where ` + context.att + `=` + context.con;
  } else {
    query = `select ` + proj + ` from bd1.accident`
  }
 
  const result = await database.simpleExecute(query);
 
  return result.rows;
}
 
module.exports.find = find;
module.exports.select_statement = select_statement;