const pool = require('../database/dbConfig');

exports.getRole = async (req, res, next) => {
    const email = req.header('auth-email');
    if(!email) {
        return res.status(401).json({ msg: 'Check your email'});    
    }
    try {
        if(email === 'abc@gmail.com') {
            console.log('Welcome Admin');
            next();
        }
        else {
            return res.send('Only valid for Admin');
        }
    } catch (error) {
        return res.status(401).json({ msg: 'Server error'});  
    }
}
