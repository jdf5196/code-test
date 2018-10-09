'use strict';
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.set('port', port);
app.use(express.static(process.cwd() + '/build'));
app.listen(app.get('port'), function(){
    console.log(`Server is listening on port ${port}`);
});