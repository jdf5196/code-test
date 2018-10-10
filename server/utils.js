const mongoose = require('mongoose');
require('./models/Data.js');
const Data = mongoose.model('Data');


module.exports = {
    // Generate a random array of data
    generateData: function(){
        let arr = [];
        for(let i = 0; i < 10; i++){
            let dataPoint = {
                x: Math.round(Math.random() * 100),
                y: Math.round(Math.random() * 100)
            };
            arr.push(dataPoint)
        };
        return arr
    },
    // Get the current data saved to the db or generate it if there is no data
    getCurrentData: function(callback){
        Data.findOne((err, data)=>{
            if(!data){
                this.saveCurrentData(callback)
            }else{
                callback(data.currentData);
            }
        })
    },
    // Generate and save new current data to the db
    saveCurrentData: function(callback){
        let d = new Data;
        let newData = this.generateData();
        d.getNewCurrentData(newData);
        d.save((err, d)=>{
            if(err){return err};
            callback(d.currentData);
        })
    }
}

