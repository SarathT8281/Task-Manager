const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Schema/User');

const CreateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.json("User already exists");
    } else {
      const userDetails = await User.create({
        name,
        email,
        password: hashedPassword
      });
      res.json({
       name:  userDetails.name,
        email:  userDetails.email,
        password: userDetails.password,
        Token: tokengenerate( userDetails._id)
      });
    }
  } catch (error) {
    console.error('Error while creating user:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const tokengenerate = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = {CreateUser,tokengenerate}