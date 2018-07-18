console.log("scheduler2 startup")

let HAPPS2 = process.env.HAPPS2 || ""

let apps2 = HAPPS2.split(";")

console.log("apps2", apps2)

const CHRON_SHUTDOWN2  =  '58 13 21-31 * *'
const CHRON_STARTUP2   =  '0 7 21-31 * *'

function setquantity2(quantity:number = 1){
    let i=0
    for(let app of apps2){
        let parts = app.split(":")

        if(parts.length > 1) {
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
        } else {
            console.log("token and name could not be parsed")
        }
    }
}

console.log("scheduling shutdown2", CHRON_SHUTDOWN2)

schedule.scheduleJob(CHRON_SHUTDOWN2, function(){
    setquantity2(0)
})

console.log("scheduling startup2", CHRON_STARTUP2)

schedule.scheduleJob(CHRON_STARTUP2, function(){
    setquantity2(1)
})
