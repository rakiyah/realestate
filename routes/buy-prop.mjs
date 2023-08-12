import express from 'express';

import db from "../database/db-connector.mjs";

const buy_prop_router = express.Router()

buy_prop_router.get('/buy-prop', function(req,res) {
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

export default buy_prop_router