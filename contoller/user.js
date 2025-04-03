const UM = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.signup = async function (req, res) {
    try {
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const { email, password } = req.body;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "fail",
                message: "Please enter a valid Gmail address (must end with @gmail.com)."
            });
        }

        const existingUser = await UM.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                status: "fail",
                message: "Email already exists"
            });
        }

        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                status: "fail",
                message: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdata = await UM.create({ ...req.body, password: hashedPassword });

        const token = jwt.sign({ id: createdata._id }, process.env.Secure_key);

        const transporter = nodemailer.createTransport({
            service: 'gmail',  
            auth: {
                user: 'pipaliyayakshat2024.katargam@gmail.com',  
                pass: 'ghswudkgrjiuoanf'    
            }
        });

        const mailOptions = {
            from: 'pipaliyayakshat2024.katargam@gmail.com',
            to: req.body.email,
            subject: 'Account Created Successfully',
            text: `Dear ${req.body.name},\n\nYour account has been created successfully!\n\nThank you for joining our platform.\n\nBest regards,\nYour Team`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email: ', error);
                return res.status(500).json({
                    status: 'fail',
                    message: 'Error sending email.'
                });
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json({
            status: "success",
            message: "User created successfully!",
            createdata,
            token
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};


exports.login = async function (req, res) {
    try {
        
        let logindata = await UM.findOne({ email: req.body.email });

        if (!logindata) {
            return res.status(404).json({
                status: "Fail",
                message: "Data not found"
            });
        }

        
        const isPasswordMatch = await bcrypt.compare(req.body.password, logindata.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                status: "Fail",
                message: "Invalid password"
            });
        }

      
        // const token = jwt.sign({ id: logindata._id }, 'YP');

        res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            logindata,
            // token
        });

    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message,
        });
    }
};

exports.viewall = async function (req, res) {
    try {
        const viewdata = await UM.find();

        res.status(201).json({
            status: "success",
            message: "User read successfully!",
            viewdata
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.update = async function (req, res) {
    try {
        const updatedata = await UM.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(201).json({
            status: "success",
            message: "User updated successfully!",
            updatedata
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};
exports.delete = async function (req, res) {
    try {
        const deletedata = await UM.findByIdAndDelete(req.params.id);

        res.status(201).json({
            status: "success",
            message: "User deleted successfully!",
            deletedata
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};
