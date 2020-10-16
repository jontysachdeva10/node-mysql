const pool = require('../../database/dbConfig');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const getUser = `select * from users where email = ?`
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    pool.query(getUser, [email], async (err, results) => {

        try {    
            if(results.length > 0) {
                const isMatched = await bcrypt.compare(password, results[0].password);
                if(isMatched) {
                    req.session.role = results[0].role;
                    req.session.user_id = results[0].id;
                    return res.status(200).json(results[0]);
                }
                else {
                   return res.status(401).send('Credentials doesnt match');
                }
            }
            else {
                return res.status(401).send('Email doesnt exists');
            }
        } 
        catch (error) {
            console.log(error);
            return res.status(400).json({msg: 'Server Error'});
        }
        
    });
}
