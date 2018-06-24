var schedule = require('node-schedule')

const Heroku = require('heroku-client')

console.log("scheduler startup")

let HAPPS = process.env.HAPPS || ""

let apps = HAPPS.split(";")

const CHRON_SHUTDOWN  =  '0 7 * * *'
const CHRON_STARTUP   =  '0 14 * * *'

function setquantity(quantity:number = 1){
    let i=0
    for(let app of apps){
        let parts = app.split(":")

        let token = parts[0]
        let name = parts[1]

        console.log("token",token,"name",name)

        i++

        setTimeout(function(){
            console.log("\ncreating client", token)

            let client = new Heroku({ token: token })            

            let url = '/apps/'+name+"/formation"

            console.log("\ncreating request", url)

            client.patch(url, {body:{"updates":[{"type":"worker", "quantity": quantity}]}}).
                then((apps:any) => {
                    console.log("\nresponse for", token, name, "\n")
                    console.log(apps)
                })

        }, i*10000)
    }
}

console.log("scheduling shutdown", CHRON_SHUTDOWN)

schedule.scheduleJob(CHRON_SHUTDOWN, function(){
    setquantity(0)
})

console.log("scheduling startup", CHRON_STARTUP)

schedule.scheduleJob(CHRON_STARTUP, function(){
    setquantity(1)
})

setquantity(1)