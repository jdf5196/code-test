'use strict';

const mongoose = require('mongoose');

// Define the DataSchema
const DataSchema = new mongoose.Schema({
    currentData: [{x: Number, y: Number}],
    savedData:[{x: Number, y: Number}]
}, {capped: {size:1024, max:1}});

// Define a method to update the current data array
DataSchema.methods.getNewCurrentData = function(arr){
    this.currentData = [...arr];
}

// Define a method to add new data to the saved data array
DataSchema.methods.addSavedData = function(arr){
    this.savedData = [...this.savedData, ...arr]
}

mongoose.model('Data', DataSchema);