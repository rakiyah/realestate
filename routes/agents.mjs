import express from 'express';

import db from "../database/db-connector.mjs";

const agent_router = express.Router()

agent_router.get('/agents', function(req,res) {
    const q_agents = 'SELECT `agent_id`, `email`, `phone`, `name` FROM `agents`;'

    db.pool.query(q_agents, function(err, rows, fields) {
        const agents = rows
        return res.render('agents', {data: agents})
    })
})

agent_router.get('/agents/:agent_id', function(req,res) {
    const agent_id = req.params.agent_id

    const q = `SELECT * FROM agents WHERE agent_id = ?`

    db.pool.query(q, [agent_id], function(err, rows, fields) {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        } else res.send(rows[0])
    })
})

agent_router.post('/add-agent', function(req,res) {
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

agent_router.put('/put-agent', function(req,res,next) {
    const data = req.body
    console.log(data)
    const agent_id = parseInt(data.agent_id)
    const name = data.name
    const email = data.email
    const phone = data.phone

    const q_update = `UPDATE agents SET name = ?, email = ?, phone = ? WHERE agents.agent_id = ?`
    db.pool.query(q_update, [name, email, phone, agent_id], function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.send(rows)
        }
    })
})

agent_router.delete('/delete-agent', function(req,res,next) {
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



export default agent_router