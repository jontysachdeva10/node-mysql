const pool = require('../../database/dbConfig');
const {v4: uuidv4 } = require('uuid');

exports.orderDetails = (req, res) => {

    const{ payer_id, products, payment_total } = req.body;
    const userId = req.session.user_id;
    const paymentId = uuidv4();
    const insert_query = `insert into orders(user_id, payment_id, payer_id, payment_total, created_at) values(?,?,?,?,CURRENT_TIMESTAMP)`
    try {
        pool.query(insert_query, [
            userId,
            paymentId,
            payer_id,
            payment_total
            ], (error, results) => {
            if(!error) 
            {        
                const order_id = results['insertId'];
                console.log(order_id);

                return products.map(item => {
    
                    pool.query(`insert into order_items(order_id, product_id, created_at) values(?,?,CURRENT_TIMESTAMP)`,
                    [order_id, item.id], 
                    (error) => {
                        if(!error) {
                            return res.status(200).send('Order Placed');
                        }
                        else {
                            return res.status(401).send('Order could not be placed');
                        }
                    });
                }); 
            }
            else {
                return res.status(400).send("Error!!");
            }
        });
    } 
    catch (error) { 
        console.log(error);
        return res.status(400).json({msg: 'Server Error'});
    }
        
}


