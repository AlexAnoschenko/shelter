const Router = require('express');
const router = new Router();
const roomsController = require('../controllers/roomsController');

router.post('/createRoom', roomsController.createRoom);
router.get('/roomId', roomsController.getRoomId);

module.exports = router;
