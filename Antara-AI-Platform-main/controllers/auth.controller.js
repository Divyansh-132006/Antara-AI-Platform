import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

//sabse pahale ye check karna hai user hai ya nahi.
//password ko hashpassowrd mai change kar lenge 
//agar nahi hai phir user create kar lenge 
// send karte time user mai se password hata denge
//sab sahi rahta hai phir signup warna side hat

async function handleSignUp(req, res) {
  const { name, email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
      email,
    });
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return res.status(201).json(userWithoutPassword);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong during sign-up' });
  }
}

export default handleSignUp;
