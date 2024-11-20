const Request = require("../models/Request");
const User = require("../models/User");
const Donor = require("../models/Donor");
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');




// {
//      email: 'mohammedirfanrj@gmail.com',
//      id: '673ae97a8001175eb4e4fe2b',
//      isAdmin: true,
//      iat: 1732109928
//    }


const newRequest = async (req, res) => {

     try {
          const cookie = req.cookies.token;
          const token = cookie.split(";")[0].split(' ')[1];
          const isAuth = jwt.verify(token, process.env.JWT_SECRET);
          const { to, quantity, date, time, msg } = req.body;
          // Validate user and donor existence 
          const user = isAuth.isAdmin ? await Admin.findById(isAuth.id) : await User.findById(isAuth.id);
          const donor = await Donor.findById(to);
          if (!user || !donor) {
               return res.status(400).json({ status: false, msg: 'User or Donor not found' });
          }
          const newRequest = new Request({ from: isAuth.id, to, quantity, date, time, msg, status: "pending" });
          await newRequest.save();
          res.status(201).json({ msg: 'Request created successfully', request: newRequest, status: true });

     } catch (error) {
          // console.error('Error creating request:', error);
          res.status(500).json({ msg: 'Server error' });
     }
};

// PUT
const updateRequest = async (req, res) => {

     try {
          const { reqId, donorId } = req.params;
          const { status } = req.body;
          // console.log({ status, time, date, msg } )
          // Find the request by ID and update the fields 
          const updatedRequest = await Request.findOneAndUpdate({ _id: reqId, to: donorId }, { status }, { new: true, runValidators: true });
          if (!updatedRequest) {
               return res.status(404).json({ msg: 'Request not found' });
          }
          res.status(200).json({ msg: 'Request updated successfully', request: updatedRequest });
     } catch (error) {
          console.error('Error updating request:', error);
          res.status(500).json({ msg: 'Server error' });
     }

};

// GET
const getRequest = async (req, res) => {

     try {

          const cookie = req.cookies.token;
          const token = cookie.split(";")[0].split(' ')[1];
          const isAuth = jwt.verify(token, process.env.JWT_SECRET);

          const requests = !isAuth.isAdmin ? await Request.find({ to: isAuth.id }).populate('from').populate('to') : await Request.find({}).populate('from').populate('to');

          if (!requests) {
               return res.status(404).json({ msg: 'No requests found for this donor', status: true });
          }
          // console.log(requests)
          res.status(200).json({ requests, status: true, msg: "Request Fetched Successfully" });
     } catch (error) {
          console.error('Error fetching requests:', error);
          res.status(500).json({ msg: 'Server error', status: false });
     }

};

const deleteRequest = async (req, res) => {
     try {
          const  id = req.params.id;
          const {reqId} = req.body;
          // console.log(reqId)
          // Find and delete the request by ID 
          const deletedRequest = await Request.findByIdAndDelete(reqId);
          if (!deletedRequest) {
               return res.status(404).json({ msg: 'Request not found' });
          }


          res.status(200).json({ msg: 'Request deleted successfully', request: deletedRequest });
     } catch (error) {
          console.error('Error deleting request:', error); res.status(500).json({ msg: 'Server error' });
     }
};

module.exports = { getRequest, updateRequest, newRequest, deleteRequest };

