const {genSaltSync, hashSync} = require('bcrypt');
const pool = require('../../database/dbConfig');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {first_name, last_name, email,password, role} = req.body;
    try {
       const ePassword = await hashSync(password, genSaltSync(10));
       const insert_query = `insert into users(first_name, last_name, email, password, role) values(?,?,?,?,?)`
       if(role === 'customer' || role === 'admin') {
            pool.query(insert_query , [
                first_name,
                last_name,
                email,
                ePassword,
                role
                ],
                (error, result) => {
                    if(error) {
                        res.status(401).send('Could not register..');
                    }
                    else {
                        console.log('Registered successfully !!');
                        return res.status(200).json(result)
                    }
                }
            )
        }
        else {
            res.status(401).send('Choose customer as a role');
        }  
    }    
    catch (error) {
        console.log('Server Error' +error); 
        res.status(400).json({msg: 'Server Error'});
    }
    
}

