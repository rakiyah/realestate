import express from 'express';

import db from "../database/db-connector.mjs";

const property_router = express.Router()

property_router.get('/properties', function(req,res){
    const q_properties = `SELECT p.property_id, p.address, p.listed_price, p.on_market, p.sell_price, DATE_FORMAT(p.sell_date, "%m-%d-%Y") as sell_date,
                    a.name AS seller_agent, pb.name AS buyer_name, pb_agent.name AS buyer_agent, s.name AS seller_name
                    FROM properties p
                    LEFT JOIN agents a ON p.sellers_agent_id = a.agent_id
                    LEFT JOIN potentialBuyers pb ON p.buyer_id = pb.buyer_id
                    LEFT JOIN agents pb_agent ON pb.agent_id = pb_agent.agent_id
                    LEFT JOIN sellers s ON p.seller_id = s.seller_id;
                    `

    const q_sellers = 'SELECT `seller_id`, `email`, `phone`, `name`, `agent_id` FROM `sellers`;'
    const q_agents = 'SELECT `agent_id`, `email`, `phone`, `name` FROM `agents`;'
    const q_buyers = 'SELECT `agent_id`, `email`, `phone`, `name`, `buyer_id` FROM `potentialBuyers`;'

    db.pool.query(q_properties, function(err, rows, fields) {
        const properties = rows
        console.log(properties)

        db.pool.query(q_sellers, function(err, rows, fields) {
            const sellers = rows
6
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
    console.log('coming from property route')
    console.log(data)
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
                    // res.redirect('/properties')
                    res.send(rows)
                }
            })
        }
    })
})

export default property_router