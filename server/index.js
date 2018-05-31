"use strict";
var schedule = require('node-schedule');
console.log("scheduler startup");
let HAPPS = process.env.HAPPS || "";
let apps = HAPPS.split(";");
for (let app of apps) {
    let parts = app.split(":");
    let token = parts[0];
    let name = parts[1];
    console.log("token", token, "name", name);
}
/*schedule.scheduleJob('0-59 * * * *', function(){
    console.log("tick")
})*/
const express = require('express');
const morgan = require('morgan');
const app = express();
let PORT = 8080;
app.use(morgan('combined'));
app.get('/', (req, res) => res.send('lichessapps home'));
app.listen(PORT, () => console.log(`lichessapps server listening on ${PORT}`));
