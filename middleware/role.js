/**
 * @desc Custom Middleware function, checks if the user is admin or not by the email
 */
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
            return res.status(401).send('Only valid for Admin');
        }
    } catch (error) {
        return res.status(400).json({ msg: 'Server error'});  
    }
}

/** 
 * @desc Using Express-Session 
 */
exports.checkRole = async (req, res, next) => {

    console.log(req.session.role);
    if(!req.session.role) {
        return res.status(401).send('You have to login first');
    }

    const role = req.session.role;
    if(role === 'admin') {
        next();
    }
    else {
        return res.status(401).send('Only valid for Admin');
    }
}
