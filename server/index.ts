"use strict";

const express = require('express')
const morgan = require('morgan')

const app = express()

let PORT = 8080

app.use(morgan('combined'))

app.get('/', (req:any, res:any) => res.send('lichessapps home'))

app.get('/rworker', (req:any, res:any) => {
    restart(setquantity, 0, 1)
    res.send('restart workers')
})

app.get('/sworker', (req:any, res:any) => {
    setquantity(0)
    res.send('stop workers')
})

app.get('/rweb', (req:any, res:any) => {
    restart(setquantityw, 0, 1)
    res.send('restart webs')
})

app.get('/sweb', (req:any, res:any) => {
    setquantityw(0)
    res.send('stop webs')
})

app.listen(PORT, () => console.log(`lichessapps server listening on ${PORT}`))

