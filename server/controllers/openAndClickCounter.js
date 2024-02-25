const pool = require("../db")
const checkCounts = require("../models/analyticsQueries")


const clickCount = async ()=>{
    let count = 0;
    return count;
}

const openCount = async (analyticsId)=>{
    try {
        const result = await pool.query(checkCounts.checkOpenCounts, [analyticsId])
        let count = result.rows[0].track_open_count;
        count += 1;
        return count;
    } catch (error) {
        console.log(error.message);
    }
}

// (async ()=>{
//     console.log(await openCount('e9a42626-86c6-4223-ba2b-7861bdca843f'))
// })();


const openTimeStamp = async ()=>{

}
// console.log(pool);

module.exports = {clickCount, openCount, openTimeStamp}