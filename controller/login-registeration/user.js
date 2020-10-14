const {genSaltSync, hashSync} = require('bcrypt');
const pool = require('../database/dbConfig');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {first_name, last_name, email,password, role} = req.body;
    try {
       const ePassword = await hashSync(password, genSaltSync(10));

        pool.query(
            `insert into users(first_name, last_name, email, password, role) values(?,?,?,?,?)`, [
                first_name,
                last_name,
                email,
                ePassword,
                role
            ],
            (error, result) => {
                if(error) {
                    console.log(error);
                    res.send('Error occuered');
                }
                else {
                    console.log('Registered successfully');
                    res.json(result);
                }
            }
        )
    } 
    catch (error) {
        console.log('Server Error' +error); 
    }
    
}
