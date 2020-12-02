const database = require('../services/database.js');

const queryPreMonth = [
    `with results as (select * from bd1.involved_in natural join bd1.person natural join bd1.accident natural 
    join bd1.states natural join bd1.driver_distracted natural join bd1.mechanical_factors) select * 
    from (select accident_count, 1 as month from (select count(unique state_case_no) 
    as accident_count from results where (timestamp > '31-DEC-2014' and timestamp < '01-FEB-2015')`,
    `)) union (select accident_count, 2 as month from (select count(unique state_case_no) 
    as accident_count from results where (timestamp > '31-JAN-2015' and timestamp < '01-MAR-2015')`,
    `)) union (select accident_count, 3 as month from (select count(unique state_case_no) 
    as accident_count from results where (timestamp > '28-FEB-2015' and timestamp < '01-APR-2015')`,
    `)) union (select accident_count, 4 as month from (select count(unique state_case_no) 
    as accident_count from results where (timestamp > '31-MAR-2015' and timestamp < '01-MAY-2015')`,
    `)) union (select accident_count, 5 as month from (select count(unique state_case_no) 
    as accident_count from results where (timestamp > '30-APR-2015' and timestamp < '01-JUN-2015')`,
    `)) union (select accident_count, 6 as month from (select count(unique state_case_no) 
    as accident_count from results where (timestamp > '31-MAY-2015' and timestamp < '01-JUL-2015')`,
    `)) union (select accident_count, 7 as month from (select count(unique state_case_no) 
    as accident_count from results where (timestamp > '30-JUN-2015' and timestamp < '01-AUG-2015')`,
    `)) union (select accident_count, 8 as month from (select count(unique state_case_no) 
    as accident_count from results where (timestamp > '31-JUL-2015' and timestamp < '01-SEP-2015')`,
    `)) union (select accident_count, 9 as month from (select count(unique state_case_no) 
    as accident_count from results where (timestamp > '31-AUG-2015' and timestamp < '01-OCT-2015')`,
    `)) union (select accident_count, 10 as month from (select count(unique state_case_no) 
    as accident_count from results where (timestamp > '30-SEP-2015' and timestamp < '01-NOV-2015')`,
    `)) union (select accident_count, 11 as month from (select count(unique state_case_no) 
    as accident_count from results where (timestamp > '31-OCT-2015' and timestamp < '01-DEC-2015')`,
    `)) union (select accident_count, 12 as month from (select count(unique state_case_no) 
    as accident_count from results where (timestamp > '30-NOV-2015' and timestamp < '01-JAN-2016')`];

const queryEnd = `)) order by MONTH`;

function setMinMaxWhere(param, default_min, default_max, context) {
    uniqueWhere = `(` + param + ` >= `;
    if (context.min) {
        uniqueWhere += context.min;
    } else {
        uniqueWhere += default_min;
    }
    uniqueWhere += ` and ` + param + ` <= `
    if (context.max) {
        uniqueWhere += context.max + `)`;
    } else {
        uniqueWhere += default_max + `)`;
    }
    console.log(uniqueWhere);
    return uniqueWhere;
}

function setValidValue(param, context) {
    if (context.value != null) {
        uniqueWhere = `(` + param + ` = ` + context.value + `)`;
    } else {
        //default statement to return false if parameter is invalid
        uniqueWhere = `speed <> speed `
    }
    return uniqueWhere;
}

function addWhereClause(context) {
    uniqueWhere = ``;
    if(context.param == "age") {
        uniqueWhere = setMinMaxWhere("age", 0, 200, context);
    } else if(context.param == "timestamp") {
        uniqueWhere = setMinMaxWhere("timestamp", `'01-JAN-15'`, `'31-DEC-15'`, context);
    } else if(context.param == "speed") {
        uniqueWhere = setMinMaxWhere("speed", 0, 999, context);
    } else if(context.param == "speeding") {
        uniqueWhere = setMinMaxWhere("(speed - speed_limit)", -999, 999, context);
    } else if(context.param == "state") {
        uniqueWhere = setValidValue("state", context);
    } else if(context.param == "sex") {
        uniqueWhere = setValidValue("sex", context);
    } else if(context.param == "road_surface") {
        uniqueWhere = setValidValue("road_surface_condition", context);
    } else if(context.param == "collision") {
        uniqueWhere = setValidValue("collision_type", context);
    } else if(context.param == "weather") {
        uniqueWhere = setValidValue("weather", context);
    } else if(context.param == "drinking") {
        uniqueWhere = setValidValue("drinking", context);
    } else if(context.param == "drugs") {
        uniqueWhere = setValidValue("drugs", context);
    } else if(context.param == "mfactor") {
        uniqueWhere = setValidValue("mfactor", context);
    } else if(context.param == "distracted") {
        uniqueWhere = setValidValue("distracted", context);
    } else {
        querybegin = ``;
        queryend = ``;
    }
    console.log(uniqueWhere);
    return uniqueWhere;
}

async function select_statement(context_list) {
    query = ``;

    for(var j=0; j < 12; j++) {
        query += queryPreMonth[j];
        for(var i=0; i < context_list.length; i++) {
            query += ` and `;
            uniqueWhere = addWhereClause(context_list[i]);
            query += uniqueWhere
        }
    }

    query += queryEnd;
    console.log(query);
 
    const result = await database.simpleExecute(query);
 
    return result.rows;
}

module.exports.select_statement = select_statement;