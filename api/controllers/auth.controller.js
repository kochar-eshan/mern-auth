import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';   
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body; 
    try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler({ statusCode: 404, message: 'User not found' }));
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return next(errorHandler({ statusCode: 403, message: 'Wrong credentials' }));
    }

const token = jwt.sign({ id: user._id  }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
res.cookie("access_token",token,{
      httpOnly:true,
    }).status(200).json({ user:{id:user._id, username:user.username, email:user.email}, message: 'Signin successful', success: true });

  } catch (err) {
    next(err);
  }
};
