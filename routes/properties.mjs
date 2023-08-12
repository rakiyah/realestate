import express from 'express';

import db from "../database/db-connector.mjs";

const property_router = express.Router()

property_router.get('/properties', function(req,res){
    const q_properties = 'SELECT `property_id`, `address`, `listed_price`, `buyer_id`, `potentialBuyers_agent_id`, `seller_id`, `sellers_agent_id`, `on_market`, `sell_price`, `sell_date`  FROM `properties`;'
    const q_sellers = 'SELECT `seller_id`, `email`, `phone`, `name`, `agent_id` FROM `sellers`;'
    const q_agents = 'SELECT `agent_id`, `email`, `phone`, `name` FROM `agents`;'
    const q_buyers = 'SELECT `agent_id`, `email`, `phone`, `name`, `buyer_id` FROM `potentialBuyers`;'

    db.pool.query(q_properties, function(err, rows, fields) {
        // render index.hbs and send renderer an object
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


property_router.post('/add-property', function(req,res) {
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

export default property_router