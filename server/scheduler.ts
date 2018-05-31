var schedule = require('node-schedule')

console.log("scheduler startup")

let HAPPS = process.env.HAPPS || ""

let apps = HAPPS.split(";")

for(let app of apps){
    let parts = app.split(":")
    let token = parts[0]
    let name = parts[1]
    console.log("token",token,"name",name)
}
 
/*schedule.scheduleJob('0-59 * * * *', function(){
    console.log("tick")
})*/
