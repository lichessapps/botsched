console.log("schedulerw startup")

let HAPPSW = process.env.HAPPSW || ""

let appsw = HAPPSW.split(";")

const CHRON_SHUTDOWNW  =  '58 13 * * *'
const CHRON_STARTUPW   =  '0 7 * * *'

function setquantityw(quantity:number = 1){
    let i=0
    for(let app of appsw){
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

                client.patch(url, {body:{"updates":[{"type":"web", "quantity": quantity}]}}).
                    then((apps:any) => {
                        console.log("\nresponse for", token, name, "\n")
                        console.log(apps)
                    })

            }, 60000 + i*10000)
        } else {
            console.log("token and name could not be parsed")
        }
    }
}

console.log("scheduling shutdownw", CHRON_SHUTDOWNW)

schedule.scheduleJob(CHRON_SHUTDOWNW, function(){
    setquantityw(0)
})

console.log("scheduling startupw", CHRON_STARTUPW)

schedule.scheduleJob(CHRON_STARTUPW, function(){
    setquantityw(1)
})
