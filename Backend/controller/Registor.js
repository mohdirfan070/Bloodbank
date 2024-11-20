
const Donor = require('../models/Donor');
const User = require('../models/User');
const Admin = require('../models/Admin');

const jwt = require('jsonwebtoken');

const generateToken = async (email, id, isAdmin) => {
    return jwt.sign({ email , "id" : id , "isAdmin": isAdmin }, process.env.JWT_SECRET);
}



const registerUser = async (req, res) => {

    const { name , bloodGroup, mobile, age, email, gender, address, password, healthHistory, lastDonateDate ,user, organizationName, role, secretKey } = req.body;
    //   console.log( { name, bloodGroup, mobile, age, email, gender, address, password, healthHistory, user, organizationName, role , secretKey} )
    try {

        if (user == "donor") {
            let donor = await Donor.findOne({ email });

            if (donor) {
                return res.status(400).json({ status: false, msg: 'Email already exists!' });
            }

            donor = new Donor({
                name,
                bloodGroup,
                mobile,
                age,
                email,
                gender,
                address,
                password,
                healthHistory,
                lastDonateDate
            });
            const newDonor = await donor.save();
            
            const token = await generateToken(email, newDonor._id, newDonor.isAdmin);
            res.cookie('token', `Bearer ${token}`, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: new Date(172800000).getTime(),
                path: '/'
            })
            res.cookie('role', `${user}`, {
                httpOnly: false,
                secure: true,
                sameSite: "none",
                maxAge: new Date(172800000).getTime(),
                path: '/'
            })
            res.json({ status: true, msg: 'Donor registered successfully!' });
        }
        if (user == "user") {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'Email already exists!' });
            }
            user = new User({ role: "organisation", name, organizationName, email, password, address, mobile });
            const newUser = await user.save();
            const token = await generateToken(email, newUser._id, newUser.isAdmin);
            // console.log(token)
            res.cookie('role', `${role}`, {
                httpOnly: false,
                secure: true,
                sameSite: "none",
                maxAge: new Date(172800000).getTime(),
                path: '/'
            })
            res.cookie('token', `Bearer ${token}`, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: new Date(172800000).getTime(),
                path: '/'
            })
            res.json({ status: true, msg: 'User registered successfully!' });
        }
        if (user == "admin") {
            if (secretKey !== process.env.ADMIN_SECRET_KEY) {
                return res.status(400).json({ msg: 'Inavlid Secret Key!' });
            }
            let admin = await Admin.findOne({ email });
            if (admin) {
                return res.status(400).json({ msg: 'Email already exists!' });
            }
            admin = new Admin({ name, email, password, mobile, secretKey, isAdmin: true });
            const newAdmin = await admin.save();
            const token = await generateToken(email, newAdmin._id, newAdmin.isAdmin);
            res.cookie('role', `${user}`, {
                httpOnly: false,
                secure: true,
                sameSite: "none",
                maxAge: new Date(172800000).getTime(),
                path: '/'
            })
            res.cookie('token', `Bearer ${token}`, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: new Date(172800000).getTime(),
                path: '/'
            })
            res.json({ status: true, msg: 'Admin registered successfully!' });
        }



    } catch (result) {
        console.error(result);
        res.status(500).json({ status: false, msg: err.msg });
    }
};

const Login = async (req, res) => {
    const { email, password, user } = req.body;
    try {


        // console.log( { email, password , user } )
        let user1 = (user == "org") ? await User.findOne({ email, password }) : user == "admin" ? await Admin.findOne({ email, password }) : user == "donor" ? await Donor.findOne({ email, password }) : null;
        if (!user1) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        // console.log(user1);


        const token = await generateToken(user1.email, user1._id, user1.isAdmin);
        // console.log(token)
        res.cookie('token', `Bearer ${token}`, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: new Date(172800000).getTime(),
            path: '/'
        })

        res.cookie('role', `${user}`, {
            httpOnly: false,
            secure: true,
            sameSite: "none",
            maxAge: new Date(172800000).getTime(),
            path: '/'
        })

        res.json({ status: true, msg: 'Welcome ' + user1.name });

    } catch (err) {
        // console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const Delete = async (req, res) => {
    try {
        const { id , role  } = req.params;
        // console.log(id , role)
        const user =  role=="user"? await User.findByIdAndDelete(id)  : role=="donor" ? await Donor.findByIdAndDelete(id) : await Admin.findByIdAndDelete(id) ;

        const result = await Request.deleteMany({ $or: [{ from: id }, { to: id }] });
            console.log(result)
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ msg: 'User deleted successfully' , status:true});


    } catch (err) {
        // console.error(err.message);
        res.status(500).json({msg:'Server Error', status:false});
    }
}




module.exports = { registerUser, Login  , Delete }; 