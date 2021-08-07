import User from '../models/userModal.js';

export const followUser = async (req, res, next) => {
  try {
    const following = req.user.following.concat(req.params.id);

    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { following },
      { new: true, runValidator: true }
    );
    const otherUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $addToSet: { followers: req.user._id } },
      { new: true, runValidators: true }
    );
    if (!user) {
      throw Error('Something went wrong.');
    }
    res.status(200).json({ status: 'success', data: { user, otherUser } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

export const unfollowUser = async (req, res, next) => {
  try {
    const updatedFollowing = req.user.following.filter(
      (id) => id.toString() !== req.params.id.toString()
    );

    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { following: updatedFollowing },
      { new: true, runValidator: true }
    );
    const otherUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { followers: req.user._id } },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw Error('Something went wrong.');
    }
    res.status(200).json({ status: 'success', data: { user, otherUser } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};
