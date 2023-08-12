import express from 'express'
import { engine } from 'express-handlebars'
import exphbs from 'express-handlebars'
import db from './database/db-connector.mjs'

import agent_router from './routes/agents.mjs'
import seller_router from './routes/sellers.mjs'
import buyer_router from './routes/buyers.mjs'
import property_router from './routes/properties.mjs'
import buy_prop_router from './routes/buy-prop.mjs'

// setup
const app = express()
const PORT = 14114

app.engine('.hbs', engine({extname: ".hbs"}))
app.set('view engine', '.hbs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use('', agent_router)
app.use('', seller_router)
app.use('', buyer_router)
app.use('', property_router)
app.use('', buy_prop_router)


// ROUTES

app.get('/', function(req,res) {
    res.render('index')
})


app.listen(PORT, function(){
    console.log('app listening on PORT: ' + PORT)
})

