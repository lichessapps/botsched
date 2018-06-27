function restart(func: any, from:number, to:number){
    func(from)
    setTimeout(function(){
        func(to)
    }, 60000)
}
