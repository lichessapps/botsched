"use strict";
var schedule = require('node-schedule');
const Heroku = require('heroku-client');
console.log("scheduler startup");
let HAPPS = process.env.HAPPS || "";
let apps = HAPPS.split(";");
const CHRON_SHUTDOWN = '0 7 * * *';
const CHRON_STARTUP = '0 14 * * *';
function setquantity(quantity = 1) {
    let i = 0;
    for (let app of apps) {
        let parts = app.split(":");
        if (parts.length > 1) {
            let token = parts[0];
            let name = parts[1];
            console.log("token", token, "name", name);
            i++;
            setTimeout(function () {
                console.log("\ncreating client", token);
                let client = new Heroku({ token: token });
                let url = '/apps/' + name + "/formation";
                console.log("\ncreating request", url);
                client.patch(url, { body: { "updates": [{ "type": "worker", "quantity": quantity }] } }).
                    then((apps) => {
                    console.log("\nresponse for", token, name, "\n");
                    console.log(apps);
                });
            }, i * 10000);
        }
        else {
            console.log("token and name could not be parsed");
        }
    }
}
console.log("scheduling shutdown", CHRON_SHUTDOWN);
schedule.scheduleJob(CHRON_SHUTDOWN, function () {
    setquantity(0);
});
console.log("scheduling startup", CHRON_STARTUP);
schedule.scheduleJob(CHRON_STARTUP, function () {
    setquantity(1);
});
console.log("schedulerw startup");
let HAPPSW = process.env.HAPPSW || "";
let appsw = HAPPSW.split(";");
const CHRON_SHUTDOWNW = '58 13 * * *';
const CHRON_STARTUPW = '0 7 * * *';
function setquantityw(quantity = 1) {
    let i = 0;
    for (let app of appsw) {
        let parts = app.split(":");
        if (parts.length > 1) {
            let token = parts[0];
            let name = parts[1];
            console.log("token", token, "name", name);
            i++;
            setTimeout(function () {
                console.log("\ncreating client", token);
                let client = new Heroku({ token: token });
                let url = '/apps/' + name + "/formation";
                console.log("\ncreating request", url);
                client.patch(url, { body: { "updates": [{ "type": "web", "quantity": quantity }] } }).
                    then((apps) => {
                    console.log("\nresponse for", token, name, "\n");
                    console.log(apps);
                });
            }, 60000 + i * 10000);
        }
        else {
            console.log("token and name could not be parsed");
        }
    }
}
console.log("scheduling shutdownw", CHRON_SHUTDOWNW);
schedule.scheduleJob(CHRON_SHUTDOWNW, function () {
    setquantityw(0);
});
console.log("scheduling startupw", CHRON_STARTUPW);
schedule.scheduleJob(CHRON_STARTUPW, function () {
    setquantityw(1);
});
function restart(func, from, to) {
    func(from);
    setTimeout(function () {
        func(to);
    }, 60000);
}
function getfunclabel(func) {
    if (func == setquantity)
        return "set worker";
    if (func == setquantityw)
        return "set web";
    return "unknown";
}
function schedulerestart(chron, func, from, to) {
    console.log("scheduling restart job", chron, getfunclabel(func), "from", from, "to", to);
    schedule.scheduleJob(chron, function () {
        restart(func, from, to);
    });
}
const RESTARTS = [
    ['0 8 * * *', setquantityw, 0, 1],
    ['0 9 * * *', setquantityw, 0, 1],
    ['0 10 * * *', setquantityw, 0, 1],
    ['0 11 * * *', setquantityw, 0, 1],
    ['0 12 * * *', setquantityw, 0, 1],
    ['0 13 * * *', setquantityw, 0, 1],
    ['0 15 * * *', setquantity, 0, 1],
    ['0 16 * * *', setquantity, 0, 1],
    ['0 17 * * *', setquantity, 0, 1],
    ['0 18 * * *', setquantity, 0, 1],
    ['0 19 * * *', setquantity, 0, 1],
    ['0 20 * * *', setquantity, 0, 1],
    ['0 21 * * *', setquantity, 0, 1],
    ['0 22 * * *', setquantity, 0, 1],
    ['0 23 * * *', setquantity, 0, 1],
    ['0 0 * * *', setquantity, 0, 1],
    ['0 1 * * *', setquantity, 0, 1],
    ['0 2 * * *', setquantity, 0, 1],
    ['0 3 * * *', setquantity, 0, 1],
    ['0 4 * * *', setquantity, 0, 1],
    ['0 5 * * *', setquantity, 0, 1],
    ['0 6 * * *', setquantity, 0, 1]
];
for (let rs of RESTARTS) {
    schedulerestart(rs[0], rs[1], rs[2], rs[3]);
}
const express = require('express');
const morgan = require('morgan');
const app = express();
let PORT = 8080;
app.use(morgan('combined'));
app.get('/', (req, res) => res.send('lichessapps home'));
app.get('/rworker', (req, res) => {
    restart(setquantity, 0, 1);
    res.send('restart workers');
});
app.get('/sworker', (req, res) => {
    setquantity(0);
    res.send('stop workers');
});
app.get('/rweb', (req, res) => {
    restart(setquantityw, 0, 1);
    res.send('restart webs');
});
app.get('/sweb', (req, res) => {
    setquantityw(0);
    res.send('stop webs');
});
app.listen(PORT, () => console.log(`lichessapps server listening on ${PORT}`));
