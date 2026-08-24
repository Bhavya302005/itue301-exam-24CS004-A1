const express = require('express');
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(401).json({ success: false, message: 'Member not found' });
    }

    let role = 'member';
    if (email === 'admin@fitzone.com') {
      role = 'admin'; // just an example if needed
    }

    const payload = {
      memberId: member._id,
      email: member.email,
      role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      success: true,
      token,
      member,
      role
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
