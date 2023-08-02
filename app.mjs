import express from 'express'
import { engine } from 'express-handlebars'
import exphbs from 'express-handlebars'
import db from './database/db-connector.mjs'
// import { list } from 'forever'

// setup
const app = express()
const PORT = 14114

app.engine('.hbs', engine({extname: ".hbs"}))
app.set('view engine', '.hbs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


// ROUTES

app.get('/', function(req,res) {
    res.render('index')
})

app.get('/properties', function(req,res){
    const q_properties = 'SELECT `property_id`, `address`, `listed_price`, `buyer_id`, `potentialBuyers_agent_id`, `seller_id`, `sellers_agent_id`, `on_market`, `sell_price`, `sell_date`  FROM `properties`;'
    const q_sellers = 'SELECT `seller_id`, `email`, `phone`, `name`, `agent_id` FROM `sellers`;'
    const q_agents = 'SELECT `agent_id`, `email`, `phone`, `name` FROM `agents`;'
    const q_buyers = 'SELECT `agent_id`, `email`, `phone`, `name`, `buyer_id` FROM `potentialBuyers`;'

    db.pool.query(q_properties, function(err, rows, fields) {
        // render index.hbs and send renderer an object w
        // where 'data' is equal to 'rows' we received from query
        const properties = rows

        db.pool.query(q_sellers, function(err, rows, fields) {
            const sellers = rows

            db.pool.query(q_agents, function(err, rows, fields) {
                const agents = rows

                db.pool.query(q_buyers, function(err, rows, fields) {
                    const buyers = rows
                    return res.render('properties', 
                                {data: properties, 
                                sellers: sellers,
                                agents: agents,
                                buyers: buyers})
                }) 
            })
        })
    })
})

app.post('/add-property', function(req,res) {
    const data = req.body
    let listed_price = parseInt(data.listed_price)
    if (isNaN(listed_price))
    {
        listed_price = 'NULL'
    }


    const q1 = `INSERT INTO properties (address, listed_price, seller_id, on_market)
        VALUES ('${data.address}', ${data.listed_price}, ${data.seller_id}, ${data.on_market});`

    db.pool.query(q1, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            const q2 = `SELECT * FROM properties;`
            db.pool.query(q2, function(error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400)
                } else {
                    res.send(rows)
                }
            })
        }
    })
})

// agents routes
app.get('/agents', function(req,res){
    const q_agents = 'SELECT `agent_id`, `email`, `phone`, `name` FROM `agents`;'

    db.pool.query(q_agents, function(err, rows, fields) {
        const agents = rows
        return res.render('agents', {data: agents})
    })
})

app.post('/add-agent', function(req,res) {
    const data = req.body

    const q1 = `INSERT INTO agents (email, phone, name)
                VALUES ('${data.email}', '${data.phone}', '${data.name}');`
    
    db.pool.query(q1, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            const q2 = `SELECT * FROM agents;`
            db.pool.query(q2, function(error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400)
                } else {
                    res.send(rows)
                }
            })
        }
    })
})

app.put('/put-agent', function(req,res,next) {
    const data = req.body

    const name = parseInt(data.name)
    const email = data.email
    const phone = data.phone

    const q_update = `UPDATE agents SET email = ?, phone = ? WHERE agents.agent_id = ?`
    db.pool.query(q_update, [email, phone, name], function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.send(rows)
        }
    })
})

app.delete('/delete-agent', function(req,res,next) {
    const data = req.body

    const agent_id = parseInt(data.agent_id)
    const q_delete = `DELETE FROM agents WHERE agent_id = ?`

    db.pool.query(q_delete, [agent_id], function (error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        }
        else res.sendStatus(204)
    })
})

// Potential Buyers Routes
app.get('/buyers', function (req,res) {
    const q_buyers = `SELECT * FROM potentialBuyers`
    const q_agents = `SELECT agent_id, email, phone, name FROM agents`
    db.pool.query(q_buyers, function(error, rows, fields) {
        const buyers = rows

        db.pool.query(q_agents, function(error, rows, fields) {
            const agents = rows
            return res.render('buyers', {data: buyers, agents: agents})
        })
        
    })
})

app.post('/add-buyer', function(req,res) {
    const data = req.body

    const q1 = `INSERT INTO potentialBuyers (email, phone, name, agent_id)
                VALUES ('${data.email}', '${data.phone}', '${data.name}', ${data.agent_id})`

    db.pool.query(q1, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            const q2 = `SELECT * FROM potentialBuyers;`
            db.pool.query(q2, function(error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400)
                } else {
                    res.send(rows)
                }
            })
        }
    })
})

app.delete('/delete-buyer', function(req,res,next) {
    const data = req.body

    const buyer_id = parseInt(data.buyer_id)
    const agent_id = parseInt(data.agent_id)

    const q_delete = `DELETE FROM potentialBuyers WHERE buyer_id = ?`

    db.pool.query(q_delete, [buyer_id], function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        }
        else res.sendStatus(204)
    })
})

app.put('/put-buyer', function(req,res,next) {
    const data = req.body

    const name = parseInt(data.name)
    const email = data.email
    const phone = data.phone
    const agent_id = parseInt(data.agent_id)

    const q_update = `UPDATE potentialBuyers SET email = ?, phone = ?, agent_id = ? WHERE potentialBuyers.buyer_id = ?`
    db.pool.query(q_update, [email, phone, agent_id, name], function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.send(rows)
        }
    })
})

// Sellers routes
app.get('/sellers', function(req,res) {
    const q_sellers = `SELECT * FROM sellers`
    const q_agents = `SELECT agent_id, email, phone, name FROM agents`

    db.pool.query(q_sellers, function(err,rows,fields) {
        const sellers = rows

        db.pool.query(q_agents, function(error, rows, fields) {
            const agents = rows
            return res.render('sellers', {data: sellers, agents: agents})
        })
    })
})

app.post('/add-seller', function(req,res) {
    const data = req.body
    console.log(data)

    const q1 = `INSERT INTO sellers (email, phone, name, agent_id)
                VALUES ('${data.email}', '${data.phone}', '${data.name}', ${data.agent_id})`

    db.pool.query(q1, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            const q2 = `SELECT * FROM sellers;`
            db.pool.query(q2, function(error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400)
                } else {
                    res.send(rows)
                }
            })
        }
    })
})

// Buyers has Properties routes
app.get('/buy-prop', function(req,res) {
    const q1 = `SELECT buyer_id, property_id FROM potentialBuyers_has_properties`
    const q2 = 'SELECT * FROM properties'
    const q3 = 'SELECT `agent_id`, `email`, `phone`, `name`, `buyer_id` FROM `potentialBuyers`;'

    db.pool.query(q1, function(err, rows, fields) {
        const buyers_properties = rows

        db.pool.query(q2, function(err, rows, fields) {
            const properties = rows

            db.pool.query(q3, function(err, rows, fields) {
                const buyers = rows
                return res.render('buy-prop', {data: buyers_properties, properties: properties, buyers: buyers})
            })
        })
    })
})



app.listen(PORT, function(){
    console.log('app listening on PORT: ' + PORT)
})

