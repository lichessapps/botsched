function restart(func: any, from:number, to:number){
    func(from)
    setTimeout(function(){
        func(to)
    }, 60000)
}

function getfunclabel(func: any):string{
    if(func == setquantity) return "set worker"
    if(func == setquantityw) return "set web"
    return "unknown"
}

function schedulerestart(chron: string, func:any, from:number, to:number){
    console.log("scheduling restart job", chron, getfunclabel(func), "from", from, "to", to)
    schedule.scheduleJob(chron, function(){        
        restart(func, from, to)
    })
}

const RESTARTS:[string, any, number, number][] = [
    ['0 8 * * *',  setquantityw, 0, 1],
    ['0 9 * * *',  setquantityw, 0, 1],
    ['0 10 * * *', setquantityw, 0, 1],
    ['0 11 * * *', setquantityw, 0, 1],
    ['0 12 * * *', setquantityw, 0, 1],
    ['0 13 * * *', setquantityw, 0, 1],
    ['0 15 * * *', setquantity,  0, 1],
    ['0 16 * * *', setquantity,  0, 1],
    ['0 17 * * *', setquantity,  0, 1],
    ['0 18 * * *', setquantity,  0, 1],
    ['0 19 * * *', setquantity,  0, 1],
    ['0 20 * * *', setquantity,  0, 1],
    ['0 21 * * *', setquantity,  0, 1],
    ['0 22 * * *', setquantity,  0, 1],
    ['0 23 * * *', setquantity,  0, 1],
    ['0 0 * * *',  setquantity,  0, 1],
    ['0 1 * * *',  setquantity,  0, 1],
    ['0 2 * * *',  setquantity,  0, 1],
    ['0 3 * * *',  setquantity,  0, 1],
    ['0 4 * * *',  setquantity,  0, 1],
    ['0 5 * * *',  setquantity,  0, 1],
    ['0 6 * * *',  setquantity,  0, 1]
]

for(let rs of RESTARTS){
    schedulerestart(rs[0], rs[1], rs[2], rs[3])
}
