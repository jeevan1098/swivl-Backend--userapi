const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.post('/', validationMiddleware.validateUser, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id/pdf', userController.getUserPdf);
router.delete('/:id', userController.deleteUser);
router.put('/:id', validationMiddleware.validateUser, userController.updateUser);

module.exports = router;
