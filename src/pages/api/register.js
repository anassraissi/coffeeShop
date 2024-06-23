// pages/api/register.js
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    const { name, email, password, role } = req.body;
    console.log(name);

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, passwordHash, role });

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
