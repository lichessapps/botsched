var schedule = require('node-schedule')

console.log("scheduler startup")
 
schedule.scheduleJob('0-59 * * * *', function(){
    console.log("tick")
})
