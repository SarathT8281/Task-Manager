
const bcrypt = require('bcrypt');
const User = require('../Schema/User');
const { tokengenerate } = require('./Signup');

const toCompareUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const isUser = await User.findOne({ email });
        if (!isUser) {
            return res.status(401).json({ message: 'Email and passwords combination not valid.' });
        }

        const isPasswordValid = await bcrypt.compare(password, isUser.password);
        console.log("PASSSS: ",isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email and password combination not valid.' });
        }

        const token = tokengenerate(isUser._id);

        
        const responsePayload = {
            email: isUser.email,
            username:isUser.name,
            password: isUser.password,
            token
        };

        return res.status(200).json(responsePayload);
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};

module.exports = toCompareUser;