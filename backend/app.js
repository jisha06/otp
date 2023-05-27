const Express = require("express");
const Bodyparser = require("body-parser");
const Cors = require("cors");
const Mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const usersModel = require("./models/users");

const app = new Express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({ extended: true }))
app.use(Cors());

Mongoose.connect("mongodb+srv://jisha:jisha@cluster0.a2wdl3u.mongodb.net/OtpAuthDB?retryWrites=true&w=majority", { useNewUrlParser: true })

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rs.jisha2008@gmail.com',
        pass: 'Rajaramvedha@22',
    },
});

//Create New 
app.post('/addOtp', async (req, res) => {
    console.log("Add an email, otp")
    // Generate a random OTP
    const email = req.body.email
    const message = req.body.message
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const body = { email, otp }
    console.log(body)
    try {
        const newUser = new usersModel(body);
        console.log(newUser)
        await newUser.save();       
        // Send the OTP to the user's email
        await transporter.sendMail({
            from: 'rs.jisha2008@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP is ${otp}`,
        });
       
        res.send(newUser)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
   
});

//Check otp
app.post('/OTPVerify', async (req, res) => {
    try {
      
      let otp = req.body.otp
      let email = req.body.email.id
      console.log(otp, email)
      const savedOTP = await usersModel.findOne({ otp });
  
      if (savedOTP) {
        // delete otp
        await usersModel.deleteOne({ email, otp });
  
        res.json({ message: 'OTP verified successfully' });
      } else {
        res.status(400).json({ error: 'Invalid OTP' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to verify OTP' });
    }
  });

  
app.listen(3002, () => {
    console.log("server started in 3002")
})