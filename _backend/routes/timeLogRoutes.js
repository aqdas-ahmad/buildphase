const express = require('express');
const router = express.Router();
const { createTimeLog, getTimeLogs } = require('../controllers/timeLogController');

router.route('/')
  .post(createTimeLog)
  .get(getTimeLogs);

module.exports = router;
