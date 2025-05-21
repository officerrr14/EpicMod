const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const uuser = mongoose.model('User');

// ALL CREDITS TO YSYHA
router.get('/api/v1/friends/recommendation', async (req, res) => {
    const currentUser = req.headers.userid;
    const currentUserData = uuser.findOne({ currentUser });
    const users = await uuser.find({ userId: { $ne: currentUser } }).select('userId sex nickname');

    // Transform the nickname field to nickName in the response
    const formattedUsers = users.map(user => ({
      userId: user.userId,
      sex: user.sex,
      nickName: user.nickname,
    }));
    res.status(200).json({ code: 1, message: 'SUCCESS', data: formattedUsers });
});


module.exports = router;