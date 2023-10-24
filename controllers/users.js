const USER = require('../models/user')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "utran.m1g@gmail.com",
        pass: "cqncyefqcafgrwbd",
    },
});

async function main(email) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'utran.m1g@gmail.com', // sender address
        to: "sahuhiteshaa840@gmail.com", // list of receivers
        subject: "Welcome to SURAT", // Subject line
        // text: "Hello world?", // plain text body
        html: 'https://www.tripadvisor.in/Attractions-g297672-Activities-Udaipur_Udaipur_District_Rajasthan.html'
    });

    console.log("Message sent: %s", info.messageId);
}



// signup, login => token create => jwt.sign
// secure => token verify => jwt.verify

exports.Secure = async function (req, res, next) {
    try {
        let token = req.headers.authorization;

        if (!token) {
            throw new Error("Please attched token")
        }

        let checkToken = jwt.verify(token, "CDMI")

        console.log(checkToken);

        let checkUser = await USER.findById(checkToken.id)

        if (!checkUser) {
            throw new Error("User not found")
        }

        next()

    } catch (error) {
        res.status(401).json({
            message: error.message,
        })
    }
}

exports.SignUp = async function (req, res, next) {
    try {
        console.log(req.body);

        if (!req.body.name || !req.body.email || !req.body.password) {
            throw new Error("Please enter valid fields")
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const data = await USER.create(req.body)
        var token = jwt.sign({ id: data._id }, 'CDMI');

        await main(req.body.email)

        res.status(201).json({
            message: "User create successful",
            data: data,
            token
        })

    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
}

exports.Login = async function (req, res, next) {
    try {
        // console.log(req.body);

        if (!req.body.email || !req.body.password) {
            throw new Error("Please enter valid fields")
        }

        const user = await USER.findOne({ email: req.body.email })
        // console.log(user);

        if (!user) {
            throw new Error("Email is not valid")
        }

        const checkPass = await bcrypt.compare(req.body.password, user.password)

        if (!checkPass) {
            throw new Error("password is not valid")
        }

        var token = jwt.sign({ id: user._id }, 'CDMI');

        res.status(201).json({
            message: "User login successful",
            data: user,
            token
        })

    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
}

exports.AllUsers = async function (req, res, next) {
    try {

        const user = await USER.find()

        res.status(200).json({
            message: "Users found successful",
            data: user
        })

    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
}

exports.GetUser = async function (req, res, next) {
    try {
        console.log(req.params.id);
        const user = await USER.findById(req.params.id)

        res.status(200).json({
            message: "Users found successful",
            data: user
        })

    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
}

exports.DeleteUser = async function (req, res, next) {
    try {
        console.log(req.params.id);
        await USER.findByIdAndDelete(req.params.id)

        // res.status(200).json({
        //   message: "User delete successful",
        // })

        res.status(204).json({})

    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
}

exports.UpdateUser = async function (req, res, next) {
    try {
        console.log(req.body);
        await USER.findByIdAndUpdate(req.params.id, req.body)

        res.status(200).json({
            message: "User update successful",
        })

    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
}