router.put('/profile', verifyToken, updateUserProfile);
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Jo auth middleware se milta hai
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};