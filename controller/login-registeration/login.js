const pool = require('../../database/dbConfig');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const getUser = `select * from users where email = ?`
    pool.query(getUser, [email], async (err, results) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try {
            console.log(results);    
            if(results.length > 0) {
                const isMatched = await bcrypt.compare(password, results[0].password);
                if(isMatched) {
                    res.json(results[0]);
                    console.log('Login Successful');
                    console.log(results[0].role);
                }
                else {
                    res.send('Credentials doesnt match');
                }
            }
            else {
                res.send('Email doesnt exists');
            }
        } 
        catch (error) {
            console.log(error);
            res.json({msg: 'Server Error'});
        }
        
    });
}
