import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

//user check karna hai ki hai ya nahi
//agar hai phir password aur user ka diya hua password check karna hai ki sahi hai ya nahi
// agar sab sahi hai phir login kar le warna side hat

async function handleLogin(req, res) {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Passwodr" });
    }
   const userObj = user.toObject();
delete userObj.password;

res.json(userObj);
    return res.status(200).json({
      message: "Login successful",
      user: userData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
}

export default handleLogin;
