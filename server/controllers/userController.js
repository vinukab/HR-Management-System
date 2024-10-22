const  User = require('../models/userModel');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.login(username, password);
            
        if (!user){
            res.status(500).json({ message: 'Error in login', error }); 
        }

        res.cookie('user', user);
        res.send('Log in successful');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error in login', error });
    }
};

const getUserDetails = async(req, res) => {
    const token = req.cookies['user'].token
    const userDetails = await User.getUserDetails(token);
    res.status(200).json({...userDetails});
}

module.exports = { 
    login,
    getUserDetails
 };