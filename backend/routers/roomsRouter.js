const Router = require('express');
const router = new Router();
const roomsController = require('../controllers/roomsController');

router.post('/createRoom', roomsController.createRoom);
router.post('/createUser', roomsController.createUser);
router.get('/getRoom', roomsController.getRoom);

module.exports = router;
