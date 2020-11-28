const database = require('../services/database.js');
 
// const baseQuery = 
//  `select * from bd1.accident`;
 
const queryBegin = `with results as (select * from bd1.involved_in natural join bd1.person natural 
    join bd1.accident natural join bd1.states where speed < 900 and speed_limit < 90 and speed <> 0 
    and age < 900 and age > 0 and timestamp is not null) select (accident_count/all_count)*100 as 
    accident_percentage from (select count(unique state_case_no) as accident_count from results where `;

const queryEnd = `), (select count(unique state_case_no) as all_count from results)`;

function setMinMaxWhere(param, default_min, default_max, context) {
    uniqueWhere = `(` + param + ` > `;
    if (context.min) {
        uniqueWhere += context.min;
    } else {
        uniqueWhere += default_min;
    }
    uniqueWhere += ` and ` + param + ` < `
    if (context.max) {
        uniqueWhere += context.max + `)`;
    } else {
        uniqueWhere += default_max + `)`;
    }
    console.log(uniqueWhere);
    return uniqueWhere;
}

function setValidValue(param, context) {
    if (context.value) {
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
        uniqueWhere = setMinMaxWhere("timestamp", `'31-DEC-14'`, `'01-JAN-16'`, context);
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
    } else {
        querybegin = ``;
        queryend = ``;
    }
    console.log(uniqueWhere);
    return uniqueWhere;
}

async function select_statement(context_list) {
    query = queryBegin;

    for(var i=0; i < context_list.length; i++) {
        if(i != 0) {
            query += ` and `;
        }
        uniqueWhere = addWhereClause(context_list[i]);
        query += uniqueWhere
    }

    query += queryEnd;
    console.log(query);
 
    const result = await database.simpleExecute(query);
 
    return result.rows;
}

module.exports.select_statement = select_statement;