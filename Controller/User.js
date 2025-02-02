const jwt = require('jsonwebtoken');
const User = require('../Model/User');
const JWT_SECRET = process.env.JWT_SECRET || 'smart_secret_key';

exports.User_Register = async(req,res)=>{
    try {        
        const { username, email, password } = req.body;
        console.log(username);
        
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

exports.User_Login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

exports.User_Info = async(req,res)=>{
    try {        
        const user = await User.findById(req.user.id);
        res.status(201).json({ "User Details": user });
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
}


exports.UpdateUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
  
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      user.address = req.body.address || user.address;
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        address: updatedUser.address,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  };