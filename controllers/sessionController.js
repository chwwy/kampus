const User = require('../models/User');
const Session = require('../models/Session');

exports.startSession = async (req, res) => {
  const { cardId } = req.body;
  console.log('Received cardId:', cardId);

  try {
    const user = await User.findOne({ cardId });
    console.log('User found:', user);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const session = new Session({
      userId: user._id,
      startTime: new Date()
    });

    await session.save();
    res.status(201).json({ message: 'Session started', sessionId: session._id });
  } catch (err) {
    console.error('Error in startSession:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.endSession = async (req, res) => {
  const { cardId, tickCount } = req.body;

  try {
    const user = await User.findOne({ cardId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const session = await Session.findOne({
      userId: user._id,
      endTime: { $exists: false }
    }).sort({ startTime: -1 });

    if (!session) return res.status(404).json({ message: 'No active session found' });

    const weight = user.weight;
    const distance = tickCount * 1.0;
    const calories = parseFloat((tickCount * 0.001 * 0.9 * weight).toFixed(3));
    const endTime = new Date();

    session.tickCount = tickCount;
    session.distance = distance;
    session.calories = calories;
    session.endTime = endTime;

    await session.save();

    res.status(200).json({
      message: 'Session ended',
      sessionId: session._id,
      tickCount,
      distance,
      calories,
      startTime: session.startTime,
      endTime
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getSessionHistory = async (req, res) => {
  const { cardId } = req.params;

  try {
    const user = await User.findOne({ cardId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const sessions = await Session.find({ userId: user._id }).sort({ startTime: -1 });

    res.status(200).json({
      cardId,
      totalSessions: sessions.length,
      sessions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getLatestActiveSession = async (req, res) => {
  try {
    console.log('🔍 Looking for latest session...');
    const latest = await Session.findOne({ endTime: null }).sort({ startTime: -1 });

    if (!latest) {
      console.log('⚠️ No active session found');
      return res.status(404).json({ message: 'No active session found' });
    }

    console.log('✅ Found session:', latest);
    console.log('🔍 Looking for userId:', latest.userId);

    const user = await User.findById(latest.userId);

    if (!user) {
      console.log('❌ User not found for userId:', latest.userId);
      return res.status(404).json({ message: 'User not found for latest session' });
    }

    console.log('✅ Found user:', user);

    res.json({
      cardId: user.cardId,
      userExists: true,
      startTime: latest.startTime
    });
  } catch (err) {
    console.error('❌ Server error in getLatestActiveSession:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

