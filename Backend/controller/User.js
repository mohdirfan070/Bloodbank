const Donor = require('../models/Donor');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Fetch users with pagination
const getUsers = async (req, res) => {
        try {
        // const { page  } = req.params;
        // const users = await User.find().limit(limit * 1).skip((page - 1) * limit).exec();
        // const count = await User.countDocuments();
        // res.json({ users, totalPages: Math.ceil(count / limit), currentPage: page ,status:true});
        const users = await User.find();
        const count = await User.countDocuments();
        res.json({ users, total:count,status:true});
        
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
// Fetch donors with pagination
const getDonors = async (req, res) => {
    try {
        // const { page = 1, limit = 10 } = req.params;
        // const donors = await Donor.find().limit(limit * 1).skip((page - 1) * limit).exec();
        // const count = await Donor.countDocuments();
        // res.json({ donors, totalPages: Math.ceil(count / limit), currentPage: page , status:true });
        const users = await Donor.find();
        const count = await Donor.countDocuments();
        res.json({ users, total:count,status:true});
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = { getDonors , getUsers };