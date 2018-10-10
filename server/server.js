'use strict';

const mongoose = require('mongoose');
const express = require('express');
const WebSocket = require('ws');
const utils = require('./utils.js');
const db = 'mongodb://127.0.0.1:27017/jdfbitotest';
mongoose.connect(db);
require('./models/Data.js');
const Data = mongoose.model('Data');

const port = process.env.PORT || 3000;

// Create express server
const server = express()
    .use(express.static(process.cwd() + '/build'))
    .listen(port, ()=>{
        console.log(`Listening on port ${port}.`)
    });

// Create websocket server with express server
const wss = new WebSocket.Server({server});

// Define what happens when a user connects to the websocket server
wss.on('connection', (ws, req)=>{
    let id = req.headers['sec-websocket-key'];
    console.log(`${id} has joined`);
    utils.getCurrentData((d)=>{
        ws.send(JSON.stringify(d));
    })
});

// Create and send new data to each connected user every 10 seconds
setInterval(()=>{
    utils.saveCurrentData((d)=>{
        wss.clients.forEach((client)=>{
            client.send(JSON.stringify(d))
        })
    })
}, 10000);
