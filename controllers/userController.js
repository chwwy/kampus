const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { cardId, name, weight } = req.body;

  if (!cardId || !name || !weight) {
    return res.status(400).json({ message: 'cardId, name, and weight are required' });
  }

  try {
    const existing = await User.findOne({ cardId });
    if (existing) {
      return res.status(409).json({ message: 'cardId already exists' });
    }

    const newUser = new User({ cardId, name, weight });
    await newUser.save();

    res.status(201).json({
      message: 'User created',
      userId: newUser._id,
      cardId,
      name,
      weight
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserByCardId = async (req, res) => {
  try {
    const user = await User.findOne({ cardId: req.params.cardId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
