const express = require('express');
const router = express.Router();
const  { registerUser , Login , Delete  }  = require('../controller/Registor.js');
const adminMiddleware = require('../middlewear/Admin.js');

router.route('/apiv1/registor').post(registerUser);
router.route('/apiv1/login').post(Login);
router.route('/apiv1/donor/:id/:role').delete(adminMiddleware,Delete);
router.route('/apiv1/user/:id/:role').delete(adminMiddleware,Delete);
module.exports = router;
