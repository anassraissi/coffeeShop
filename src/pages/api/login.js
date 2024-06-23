import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { use } from 'react';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    await dbConnect();

    const { email, password } = req.body;
        console.log(email,password);
    try {
      // Find user by email
      const user = await User.findOne({email}).lean().exec();
      console.log(user);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      console.log(user.passwordHash);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Create JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });   

      return res.status(200).json({ token,user});
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
