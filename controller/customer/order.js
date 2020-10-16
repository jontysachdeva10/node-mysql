const pool = require('../../database/dbConfig');

exports.orderDetails = (req, res) => {
    const{user_id, payment_id, payer_id, payment_total} = req.body;
    const insert_query = `insert into orders(user_id, payment_id, payer_id, payment_total, created_at) values(?,?,?,?,CURRENT_TIMESTAMP)`
    pool.query(insert_query, [
        user_id,
        payment_id,
        payer_id,
        payment_total
    ], (results, error) => {
        if(error) {
            res.status(401).send('Could not enter values');
            console.log(error);
        }
        else {
            res.status(200).send(results);
        }
    })
}

exports.placeOrder = (req, res) => {
    const {order_id, product_id} = req.body;
    const insert_query = `insert into order_items(order_id, product_id, created_at) values(?,?,CURRENT_TIMESTAMP)`
    pool.query(insert_query, [
        order_id, 
        product_id
    ], (results, error) => {
        if(error) {
            res.status(401).send('Could not enter values');
            console.log(error);
        }
        else {
            res.status(200).send(results);
        }
    })
}