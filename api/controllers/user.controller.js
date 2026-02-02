import { errorHandler } from '../utils/error.js';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const test = (req, res) => {
  {
    res.json({ message: 'API working' });
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only update your own account.'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true },
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({ message: 'User updated', updatedUser: rest });
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only delete your own account.'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .clearCookie('access_token', {
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
