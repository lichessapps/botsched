"use strict";
var schedule = require('node-schedule');
console.log("scheduler startup");
schedule.scheduleJob('0-59 * * * *', function () {
    console.log("tick");
});
const express = require('express');
const morgan = require('morgan');
const app = express();
let PORT = 8080;
app.use(morgan('combined'));
app.get('/', (req, res) => res.send('lichessapps home'));
app.listen(PORT, () => console.log(`lichessapps server listening on ${PORT}`));
