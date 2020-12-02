const database = require('../services/database.js');

const queryWhole = `with table_count as (select * from 
    (select 'ACCIDENT' as Table_name, count(*) as Tuples from bd1.accident) union
    (select 'VEHICLE' as Table_name, count(*) as Tuples from bd1.vehicle) union
    (select 'PERSON' as Table_name, count(*) as Tuples from bd1.person) union
    (select 'INVOLVED_IN' as Table_name, count(*) as Tuples from bd1.involved_in) union
    (select 'DRIVER_DISTRACTED' as Table_name, count(*) as Tuples from bd1.driver_distracted) union
    (select 'MECHANICAL_FACTORS' as Table_name, count(*) as Tuples from bd1.mechanical_factors) union
    (select 'STATES' as Table_name, count(*) as Tuples from bd1.states))
    select * from (select * from table_count union (select 'TOTAL' as Table_name, sum(Tuples) as Tuples from table_count)) order by Tuples desc`

async function select_statement(context) {
    console.log(context);
    let query = queryWhole;
    console.log(query);
 
    const result = await database.simpleExecute(query);
 
    return result.rows;
}

module.exports.select_statement = select_statement;