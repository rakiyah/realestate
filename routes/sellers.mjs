import express from 'express'

import db from '../database/db-connector.mjs'

const seller_router = express.Router()

seller_router.get('/sellers', function(req,res) {
    const q_sellers = `SELECT seller.*, agents.name AS agent_name
                    FROM sellers AS seller
                    JOIN agents ON seller.agent_id = agents.agent_id;`

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

seller_router.delete('/delete-seller', function(req,res,next) {
    const data = req.body

    const seller_id = parseInt(data.seller_id)
    const agent_id = parseInt(data.agent_id)

    const q_delete = `DELETE FROM sellers WHERE seller_id = ?`

    db.pool.query(q_delete, [seller_id], function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        }
        else res.sendStatus(204)
    })
})

seller_router.put('/put-seller', function(req,res,next) {
    const data = req.body

    const name = parseInt(data.name)
    const email = data.email
    const phone = data.phone
    const agent_id = parseInt(data.agent_id)

    const q_update = `UPDATE sellers SET email = ?, phone = ?, agent_id = ? WHERE sellers.seller_id = ?`
    db.pool.query(q_update, [email, phone, agent_id, name], function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else res.send(rows)
    })
})

export default seller_router