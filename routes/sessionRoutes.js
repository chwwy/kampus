const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const sessionController = require('../controllers/sessionController');

router.post('/start', sessionController.startSession);
router.post('/end', sessionController.endSession);
router.get('/active-latest', sessionController.getLatestActiveSession);
router.get('/:cardId', sessionController.getSessionHistory);
  
  module.exports = router; // ✅ MUST BE PRESENT
