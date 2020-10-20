const pool = require('../../database/dbConfig');
const {validationResult} = require('express-validator');

// Add Product
exports.addProduct = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const {name, description, price, currency} = req.body;
        const insert_query = `insert into products(name, description, price, currency) values(?,?,?,?)`
        pool.query(insert_query, [
            name, 
            description, 
            price, 
            currency
        ], (error) => {
            if(error) {
                console.error(error);
                return res.status(401).json({msg: 'Couldnt save Product'});
            }
            return res.status(200).json({msg: 'Products saved successfully'});
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({msg: 'Server Error'});
    }  
} 


// Delete Product
exports.removeProduct =  (req, res) => {
    try {
        const delete_query = "delete from products where id= "+req.params.id;
        pool.query(delete_query, (error) => {
            if(!error) {
                return res.status(200).send('Id deleted: '+req.params.id);
            }
            else {
                console.log(error);
                return res.status(401).send('Could not delete');
            }
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({msg: 'Server Error'});  
    }
}

// Get all products
exports.getProduct = (req, res) => {
    try {
        pool.query('select * from products', (error, results) => {
            if(!error) {
                return res.status(200).json(results);
            }
            else {
                console.log(error);
                return res.status(401).send('Could not fetch');
            }
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({msg: 'Server Error'});
    }
}

// Update Product
exports.updateProduct = (req, res) => {
    try {
        const {description, price} = req.body;
        const update_query = "update products set description ='"+description+
                              "', price='"+price +
                              "' where id =" +req.params.id;
    
            pool.query(update_query, (error) => {
                if(!error) {
                    return res.status(200).send('Id Updated: '+req.params.id);
                }
                else {
                    console.error(error);
                    return res.status(401).send('Could not update');
                }
            })   
     
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({msg: 'Server Error'});
    }
}