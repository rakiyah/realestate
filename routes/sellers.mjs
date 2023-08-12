import express from 'express'

import db from '../database/db-connector.mjs'

const seller_router = express.Router()

seller_router.get('/sellers', function(req,res) {
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


seller_router.post('/add-seller', function(req,res) {
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
                    console.log(rows)
                    res.send(rows)
                }
            })
        }
    })
})

export default seller_router