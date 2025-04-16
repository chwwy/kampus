const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post('/start', sessionController.startSession);
router.post('/end', sessionController.endSession);
router.get('/:cardId', sessionController.getSessionHistory);

module.exports = router;
