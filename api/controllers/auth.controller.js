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
      return next(
        errorHandler({ statusCode: 403, message: 'Wrong credentials' }),
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
        },
        message: 'Signin successful',
        success: true,
      });
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json({
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
          },
          message: 'Signin successful',
          success: true,
        });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password: hashedPasswordNew, ...rest } = newUser._doc;

      const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json({
          user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profilePicture: newUser.profilePicture,
          },
          message: 'Signin successful',
          success: true,
        });
    }
  } catch (error) {
    next(error);
  }
};
export const signout = (res, next) => {
  try {
    res.clearCookie('access_token', {
      httpOnly: true,
    });
    res.status(200).json({ message: 'User signed out successfully' });
  } catch (error) {
    next(error);
  }
};
