const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const sessionController = require('../controllers/sessionController');

router.post('/start', sessionController.startSession);
router.post('/end', sessionController.endSession);
router.get('/:cardId', sessionController.getSessionHistory);
router.get('/active-latest', async (req, res) => {
    try {
      const session = await Session.findOne({ endTime: null })
        .sort({ startTime: -1 })
        .populate('userId');
  
      if (!session) return res.status(404).json({ error: 'No active session' });
  
      res.json({
        cardId: session.userId?.cardId,
        userExists: !!session.userId
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router; // ✅ MUST BE PRESENT
