import express from 'express'

import db from '../database/db-connector.mjs'

const buyer_router = express.Router()


buyer_router.get('/buyers', function (req,res) {
    const q_buyers =    `SELECT pbuyer.*, a.name AS agent_name
                        FROM potentialBuyers AS pbuyer
                        JOIN agents AS a ON pbuyer.agent_id = a.agent_id;`
    const q_agents = `SELECT agent_id, email, phone, name FROM agents`
    db.pool.query(q_buyers, function(error, rows, fields) {
        const buyers = rows

        db.pool.query(q_agents, function(error, rows, fields) {
            const agents = rows
            return res.render('buyers', {data: buyers, agents: agents})
        })
        
    })
})


buyer_router.post('/add-buyer', function(req,res) {
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

buyer_router.delete('/delete-buyer', function(req,res,next) {
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

buyer_router.put('/put-buyer', function(req,res,next) {
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

export default buyer_router