const mongoose = require('mongoose');
require('./models/Data.js');
const Data = mongoose.model('Data');


module.exports = {
    // Generate a random array of data
    generateRandomData: function(){
        let arr = [];
        for(let i = 0; i < 10; i++){
            let dataPoint = {
                x: Math.round(Math.random() * 100),
                y: Math.round(Math.random() * 100),
                saved: false
            };
            arr.push(dataPoint)
        };
        return arr
    },

    // Create data store if one does not exist already
    createData: function(callback){
        Data.findOne((err, data)=>{
            if(err){console.log(err)}
            if(!data){
                let d = new Data;
                let newData = this.generateRandomData();
                d.currentData = newData;
                d.save((err, d)=>{
                    if(err){console.log(err)}
                    callback(d)
                })
            }else{
                callback(data)
            }
        })
    },

    // Get the current data saved to the db
    getData: function(callback){
        Data.findOne((err, data)=>{
            if(err){console.log(err)};
            callback(data);
        })
    },

    // Generate and save new current data to the db
    generateNewCurrentData: function(callback){
        let newData = this.generateRandomData();
        Data.findOne((err, data)=>{
            if(err){console.log(err)}
            data.getNewCurrentData(newData);
            data.save((err, d)=>{
                if(err){console.log(err)};
                callback(d);
            })
        })
    },

    // Save current data to the saved data array
    saveCurrentData: function(newData, callback){
        Data.findOne((err, data)=>{
            if(err){console.log(err)}
            data.addSavedData(newData);
            data.save((err, d)=>{
                if(err){console.log(err)};
                callback(d);
            })
        })
    }
}

