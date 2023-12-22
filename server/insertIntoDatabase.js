const path = require('path')
const fs = require('fs')
const updateLocation = require('./models/profileQueries')
const pool = require('./db')

const filePath = './countries.csv';

fs.readFile(filePath, 'utf8', (error, data)=>{
    try {
        let splitData = data.split('\n').slice(1)
        let countryArray = []
        splitData.forEach(data=>{
            let miniSplitData = data.split(',')
            pool.query(updateLocation.updateLocation, [miniSplitData[1], miniSplitData[0]], (error, results)=>{
                console.log("updated successfully")
            })
            console.log(miniSplitData)
            countryArray.push({country: miniSplitData[1], code: miniSplitData[0]})
        })
        console.log(countryArray.length);
    } catch (error) {
        console.log(error.message);
    }
})