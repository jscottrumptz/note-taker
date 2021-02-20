const router = require('express').Router();
const notesRoutes = require('./noteRoutes');

// not needed for this project, but includeded a a reference for myself as to how to route api
// to different data sets in the future
router.use(notesRoutes);

module.exports = router;