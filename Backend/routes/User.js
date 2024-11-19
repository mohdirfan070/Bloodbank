const express = require('express');
const router = express.Router();
const { getUsers, getDonors } = require('../controller/User');
const adminMiddleware = require('../middlewear/Admin');
// Routes
router.route("/apiv1/donors").get( getDonors);
router.route("/apiv1/users").get( getUsers);

module.exports = router;
