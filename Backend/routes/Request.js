const express = require('express');
const router = express.Router();
const  { updateRequest , newRequest , getRequest , deleteRequest  }  = require('../controller/Request.js');
router.route("/apiv1/newrequest").post(newRequest);
router.route("/apiv1/getreq").get(getRequest);
router.route("/apiv1/updatereq/:donorId/:reqId").put(updateRequest);
router.route("/apiv1/deletereq/:id").post(deleteRequest);
module.exports = router;
