const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema.js')
const Org = require('../models/orgSchema.js')

const router = express.Router()

/* Register User */
router.post('/register_user', async (req, res) => {   /* asynchronous calling, calling of frontend to backend, backend to database */
    try {
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const organization = req.body.organization
        const email = req.body.email
        const password = req.body.password
        console.log(first_name)


        const existing = await User.findOne({ email: email })
        if (existing) {
            throw new Error("User already exists")
        }
        
        const org = await Org.findOne({name: organization})
        if (!org) {
            throw new Error("Org does not exist")
        }

        const salt = await bcrypt.genSalt();     /* encryption: we r using random salt to encrpyt our password */
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            first_name,
            last_name,
            organization,
            email,
            password: passwordHash,   /* we r storing the encrypted password in the database */
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ email: savedUser.email, role: 'teacher' }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        //return user and token to client, exclude hashed password
        savedUser.password = undefined;
        // send token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, //solo funciona en https
        });

        res.status(200).json(savedUser);    /* 201 is status code which will be given to frontend when something is being Created */

    } catch (err) {
        res.status(500).json({ error: err.message })     /* if there is an error, frontend will be given the status code 500, which wil indictae errror */
    }
});

/* Register Org */
router.post('/register_org', async (req, res) => {
    try {
        const {
            email,
            password,
            description,
            image_url,
        } = req.body;
        const name = req.body.org_name
        const address = req.body.org_address

        const existing = await Org.findOne({ email })
        if (existing) {
            throw new Error("Org already exists")
        }

        const salt = await bcrypt.genSalt();     /* encryption: we r using random salt to encrpyt our password */
        const passwordHash = await bcrypt.hash(password, salt);

        const newOrg = new Org({
            name,
            email,
            address,
            password: passwordHash,   /* we r storing the encrypted password in the database */
            description,
            image_url,
        });

        const savedOrg = await newOrg.save();

        const token = jwt.sign({ email: savedOrg.email, role: 'organization' }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        //return user and token to client, exclude hashed password
        savedOrg.password = undefined;
        // send token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, //solo funciona en https
        });

        res.status(200).json(savedOrg);    /* 201 is status code which will be given to frontend when something is being Created */

    } catch (err) {
        res.status(500).json({ error: err.message })     /* if there is an error, frontend will be given the status code 500, which wil indictae errror */
    }
});

// API endpoint to log in a user using a token
// router.post('/login_user', async (req, res) => {
//     const { email, password } = req.body
//     const user = await User.findOne({email})
//     // Create a JWT token with the user's email
//     const token = jwt.sign({ email: user.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
//     if(user && await bcrypt.compare(password, user.password)) {
//         res.json({token: generateToken(user._id), id: user._id})
//     }
//     else {
//         res.status(500).json({message:"email not found!" })
//     }
//     res.cookie('token', token, {
//         expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
//         httpOnly: true // prevent client side JS from reading the cookie
//     })
//     // Return the token in a JSON response
//     return res.json({ token: token });
//   });

//   // API endpoint to log in a user using a token
// router.post('/login_org', async (req, res) => {    
//     const { email, password } = req.body
//     const org = await Org.findOne({email})
//     // Create a JWT token with the user's email
//     const token = jwt.sign({ email: org.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });


//     if(org && await bcrypt.compare(password, org.password)) {
//         res.json({token: generateToken(org._id), id: org._id})
//     }
//     else {
//         throw new Error("email not found!")
//     }
//     res.cookie('token', token, {
//         expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
//         httpOnly: true // prevent client side JS from reading the cookie
//     })
//     // Return the token in a JSON response
//     return res.json({ token: token });
//   });
module.exports = router