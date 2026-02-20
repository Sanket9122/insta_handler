const express = require('express');
const router = express.Router();

const  UserController  = require('../../controllers/user.controller');
console.log("Controller content:", UserController);
const  authenticate  = require('../../middlewares/auth');

// const app = express();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/logout', authenticate, UserController.logout); 
router.get('/logout-all-devices', authenticate, UserController.logoutToAllDevices);
router.get('/get-all-details',UserController.getAllUsers);
router.get('/get-user/:id',UserController.getUserById);

module.exports = router;