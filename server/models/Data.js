'use strict';

const mongoose = require('mongoose');

// Define the DataSchema
const DataSchema = new mongoose.Schema({
    currentData: [{x: Number, y: Number}],
    savedData: [{}],
    isCurrentDataSaved: Boolean
});

// Define a method to update the current data array
DataSchema.methods.getNewCurrentData = function(arr){
    this.currentData = [...arr];
    this.isCurrentDataSaved = false;
}

// Define a method to add new data to the saved data array
DataSchema.methods.addSavedData = function(arr){
    if(!this.isCurrentDataSaved){
        let index = 0;
        if(this.savedData.length >= 100){
            index = 10;
        }
        this.savedData = [...this.savedData.slice(index, 100), ...arr];
        this.isCurrentDataSaved = true;
    }
}

mongoose.model('Data', DataSchema);