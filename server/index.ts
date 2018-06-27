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

app.get('/rweb', (req:any, res:any) => {
    restart(setquantityw, 0, 1)
    res.send('restart web')
})

app.listen(PORT, () => console.log(`lichessapps server listening on ${PORT}`))

