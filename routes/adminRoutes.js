const express = require('express');

const authMiddleware = require("../middlewares/authMiddleware");
const { getAllUsersController, getAllDoctorsController,changeAccountStatusContoller } = require('../controllers/adminCtrl');

const router = express.Router();



//get method || users
router.get('/getAllUsers', authMiddleware, getAllUsersController)

//get method || doctors
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

//post account status change
router.post('/changeAccountStatus', authMiddleware,changeAccountStatusContoller)

module.exports = router;