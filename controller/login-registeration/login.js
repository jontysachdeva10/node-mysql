const pool = require('../../database/dbConfig');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const session = require('express-session');

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
                    req.session.role = results[0].role;
                    res.status(200).json(results[0]);
                    // console.log('Login Successful');
                    // console.log(results[0].role);
                    
                }
                else {
                    res.status(401).send('Credentials doesnt match');
                }
            }
            else {
                res.status(401).send('Email doesnt exists');
            }
        } 
        catch (error) {
            console.log(error);
            res.status(400).json({msg: 'Server Error'});
        }
        
    });
}
