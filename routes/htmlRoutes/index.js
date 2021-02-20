const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// catch all sends to homepage
router.get("*", function(req, res) { 
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;