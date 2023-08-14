import express from 'express';

import db from "../database/db-connector.mjs";

const buy_prop_router = express.Router()

buy_prop_router.get('/buy-prop', function(req,res) {
    const q1 = `SELECT pb.name AS buyer_name, pb.buyer_id as buyer_id, p.address AS property_address, p.property_id as property_id
                FROM potentialBuyers AS pb
                JOIN potentialBuyers_has_properties AS pbhp ON pb.buyer_id = pbhp.buyer_id
                JOIN properties AS p ON pbhp.property_id = p.property_id;`
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

buy_prop_router.post('/add-buy-prop', function(req,res) {
    const data = req.body
    
    const q1 = `INSERT INTO potentialBuyers_has_properties (buyer_id, property_id)
                VALUES ('${data.buyer_id}', '${data.property_id}');`

    db.pool.query(q1, function(err, rows, fields) {
        if (err) {
            console.log(err)
            res.sendStatus(400)
        } else {
            const q2 = `SELECT * FROM potentialBuyers_has_properties;`
            db.pool.query(q2, function(err, rows, fields) {
                if (err) {
                    console.log(err)
                    res.sendStatus(400)
                } else res.send(rows)
            })
        }
    })
})

buy_prop_router.delete('/delete-buy-prop', function(req,res,next) {
    const data = req.body
    
    const buyer_id = parseInt(data.buyer_id)
    const property_id = parseInt(data.property_id)

    const q_delete = `DELETE FROM potentialBuyers_has_properties 
                    WHERE buyer_id = ? AND property_id = ?;`

    db.pool.query(q_delete, [buyer_id, property_id], function(err, rows, fields) {
        if (err) {
            console.log(err)
            res.sendStatus(400)
        } else res.sendStatus(204)
    })
})

export default buy_prop_router