'use strict';

const mongoose = require('mongoose');
const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const utils = require('./utils.js');
const compression = require('compression');
const db = 'mongodb://127.0.0.1:27017/jdfbitotest';
mongoose.connect(db);

const port = process.env.PORT || 3000;

// Create express server
const server = express()
    .use(compression())
    .use(express.static(process.cwd() + '/build'))
    .get('/*', function(req, res){
		res.sendFile(path.resolve(__dirname, '../', 'build/index.html'));
	})
    .listen(port, ()=>{
        utils.createData((d)=>{
            console.log('Data ready')
        });
        console.log(`Listening on port ${port}.`)
    })

// Create websocket server with express server
const wss = new WebSocket.Server({server});

// Define what happens when a user connects to the websocket server
wss.on('connection', (ws, req)=>{
    let id = req.headers['sec-websocket-key'];
    console.log(`${id} has joined`);
    utils.getData((d)=>{
        let newData = {
            data: d,
            type: 'initial'
        }
        ws.send(JSON.stringify(newData));
    });
    ws.on('message', (data)=>{
        let msg = JSON.parse(data);
        switch(msg.type){
            case 'save':
                utils.saveCurrentData(msg.data, (d)=>{
                    let newData = {
                        data: d,
                        type: 'save'
                    }
                    wss.clients.forEach((client)=>{
                        client.send(JSON.stringify(newData))
                    })
                });
                break;
        }
    })
});

// Create and send new data to each connected user every 10 seconds
setInterval(()=>{
    utils.generateNewCurrentData((d)=>{
        let newData = {
            data: d,
            type: 'new'
        }
        wss.clients.forEach((client)=>{
            client.send(JSON.stringify(newData))
        })
    })
}, 10000);
