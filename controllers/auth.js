import User from '../models/user.js';
import { comparePassword, hashPassword } from '../utils/auth.js';
import { createJwtToken, verifyToken } from '../utils/jwt.js';
import crypto from 'crypto';
import { sendForgotEmail } from '../utils/sms.js';

const AuthController = {
  login: async (req, res) => {
    try {
      const { admin, password } = req.body;

      if (!admin || !password) throw new Error("Admin and password are required!");

      const user = await User.findOne({ where: { admin } });

      if (!user) throw new Error("Admin Not Found!");

      const isAuthorised = await comparePassword(password, user.password);
      if (!isAuthorised) throw new Error("Invalid Credentials!");

      const accessToken = createJwtToken(admin, user.tokenVersion, user.id);
      console.log(accessToken);

      res.status(200).json({
        message: {
          accessToken,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Invalid Login" });
    }
  },

  logout: async (req, res) => {
    try {
      const JWT = req.headers["authorization"];
      const tokenDetails = await verifyToken(JWT, process.env.ACCESS_TOKEN_SECRET);
      if (!tokenDetails) return res.status(401).json({ message: "Unauthorized" });

      await User.update(
        { tokenVersion: tokenDetails.tokenVersion + 1 },
        { where: { id: tokenDetails.id } }
      );

      return res.status(200).json({ message: "Signout success" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error. Try again");
    }
  },

  forgotPin: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) throw new Error("Email is required!");

      crypto.randomBytes(32, async (err, buffer) => {
        if (err) console.log(err);

        const resetToken = buffer.toString("hex");
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(400).json({ message: "User does not exist" });

        user.resetToken = resetToken;
        user.expireToken = new Date(Date.now() + 3600000); // 1 hour expiry
        await user.save();
        await sendForgotEmail(user.email, resetToken);

        return res
          .status(200)
          .json({ message: `http://localhost:3000/updatePassword/${resetToken}` });
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  resetPin: async (req, res) => {
    try {
      const { password, token } = req.body;
      if (!token || !password) throw new Error("Token and password are required!");

      const user = await User.findOne({
        where: {
          resetToken: token,
          expireToken: { [Op.gt]: new Date() },
        },
      });

      if (!user) throw new Error("Link is expired");

      const hashedPassword = await hashPassword(password);
      await User.update({
        resetToken: null,
        expireToken: null,
        password: hashedPassword,
      }, { where: { id: user.id } });

      res.status(200).json({ message: "Pin reset successfully!" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
};

export default AuthController;
