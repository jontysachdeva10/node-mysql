const pool = require('../../database/dbConfig');
const {validationResult} = require('express-validator');

// Add Product
exports.addProduct = (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, description, price, currency} = req.body;
    const insert_query = `insert into products(name, description, price, currency) values(?,?,?,?)`

    pool.query(insert_query, [
        name, 
        description, 
        price, 
        currency
    ], (results, err) => {
        if(err) {
            res.status(401).json({msg: 'Couldnt save Product'});
            console.error(err);
        }
        else {
            console.log('Product saved successfully!!');
            res.status(200).json(results);
        }
    })
    
}

// Delete Product
exports.removeProduct = (req, res) => {
    const delete_query = "delete from products where id= "+req.params.id;
    pool.query(delete_query, (error) => {
        if(!error) {
            res.status(200).send('Id deleted: '+req.params.id);
        }
        else {
            console.log(error);
            res.status(401).send('Could not delete');
        }
    })
}

// Get all products
exports.getProduct = (req, res) => {
    pool.query('select * from products', (error, results) => {
        if(!error) {
            res.status(200).json(results);
        }
        else {
            console.log(error);
            res.status(401).send('Could not fetch');
        }
    })
}

// Update Product
exports.updateProduct = (req, res) => {
    const {description, price} = req.body;
    const update_query = "update products set description ='"+description+
                          "', price='"+price +
                          "' where id =" +req.params.id;

    pool.query(update_query, (error) => {
        if(!error) {
            res.status(200).send('Id Updated: '+req.params.id);
        }
        else {
            console.error(error);
            res.status(401).send('Could not update');
        }
    })                   
}