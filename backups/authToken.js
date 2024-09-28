const jwt = require('jsonwebtoken');
const secretKey = '1234';

const authenticateToken = (req, res, role,next) => {
    const token = req.cookies['user'];
  
    if (!token) return res.status(401).json({ error: 'Access denied 1' });
    try {
        const verified = jwt.verify(token, secretKey);
        if(role.includes(verified.role)){
            next();
        }else{
            res.status(400).json({error: 'Access denied 2'})
        }
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
  };

const creatAuthToken = (req , res, user) => {
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role, employee_id: user.employee_id }, secretKey, { expiresIn: '1h' });
    res.cookie('user', token, { httpOnly: true });
}

module.exports = {
    authenticateToken,
    creatAuthToken
};
