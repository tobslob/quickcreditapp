import express from 'express';
import userController from '../controllers/user';
import Helper from '../helper/helper';
import isAuth from '../middleware/is-Auth';
import pw from '../controllers/resetpassword';

const router = express.Router();

// user sign up route
router.post('/signup', Helper.trimmer, userController.createUser);

// user can sign up route
router.post('/signin', Helper.trimmer, userController.loginUser);

// get all users route
router.get('/user', isAuth.verifyToken, userController.getUsers);

// get a single user route
router.get('/user/:id', isAuth.verifyToken, userController.getUser);

// patch user route
router.patch('/user/:id', isAuth.verifyToken, Helper.trimmer, userController.patchUser);

// delete user route
router.delete('/user/:id', isAuth.verifyToken, userController.deleteUser);

// password reset route
router.post('/user/sendmail', pw.mailer);

// password reset route
router.post('/user/passwordreset', isAuth.verifyToken, pw.resetPassword);

module.exports = router;
