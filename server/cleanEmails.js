const fs = require("fs");
const path = require("path");
const pool = require('./db')
const query = require('./models/profileQueries');

const openedPath = path.join(__dirname, "others.txt");

let count = 0;
fs.readFile(openedPath, 'utf-8', (error, data)=>{
    try {
        data.split("\n").map((item)=>item.trimEnd()).map(item=>{
            if(item){               
                pool.query(query.checkIfEmailExists, [item], (error, result)=>{
                    if (error){
                        console.log(error);
                    } else if(result.rows.length > 0){
                        count++;
                        fs.appendFile(path.join(__dirname, 'theseExist.txt'), item + "\n", (error)=>{
                            console.log(`${item}: Exists in the database`);
                        })
                    } else{
                        pool.query(query.insertEmailsIntoDataBase, [item], (error, result)=>{
                            console.log("Added to the database")  
                        })
                    }
                    console.log(count);
                })
                }
        });
    } catch (error) {
        console.log(error.message)
    }
})

