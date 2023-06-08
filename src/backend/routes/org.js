const express = require('express')
const Org = require('../models/orgSchema')
const Course = require('../models/courseSchema')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth.js');

const app = express()
app.use('/verify-token', verifyToken);

const router = express.Router();

// POST a org
// Used by api.register_org to create new organization
// router.post('/',verifyToken,  async (req, res) => {
// 	const {name, description, image_url, email, password} = req.body;

// 	try {
// 		const org = await Org.create({name, description, image_url, email, password})
// 		res.status(200).json(org)
// 	}
// 	catch (error) {
// 		res.status(400).json({error: error.message})
// 	}
// })

router.post('/login/org', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!password) {
            return res
                .status(400)
                .send(
                    `PASSWORD IS REQUIRED`
                );
        }

        let org = await Org.findOne({ email: email });
        if (!org) {
            return res.status(400).send(`NO USER FOUND`);
        }

        const match = await bcrypt.compare(password, org.password);
        if (!match) {
            return res.status(400).send(`PASSWORD IS INCORRECT`);
        }

        const token = jwt.sign({ email: org.email, role: 'organization' }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        //return user and token to client, exclude hashed password
        org.password = undefined;
        // send token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, //solo funciona en https
        });
        //send user as json response
        res.status(200).json(org);
    } catch (error) {
        return res.status(400).send('ERROR. TRY AGAIN.');
    }
});

// Get all orgs
router.get('/' , async(req, res) => {
    const orgs = await Org.find({});
    try {
        res.status(200).json(orgs);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// LOGIN Check if username+password are correct combination., return true if correct, false if incorrect
// router.get('/login/org/:email/:password', async (req, res) => {
// 	const {email, password} = req.params

// 	const org = await Org.findOne({email: email})
// 	if (!org) {
// 		res.status(404).json({error: 'No such Organization'})
// 	}
// 	else {
//         const isMatch = await bcrypt.compare(password, org.password);   /* using becrypt to compare the password that is entered and the user password that is saved in the database */
// 		if (isMatch) {
// 			res.status(200).json({res: true}) // Email & Password are correct
// 		}
// 		else {
// 			res.status(500).json({res: false}) // Email & Password are incorrect
// 		}
// 	}
// })

// Get an org
router.get('/org/:email', verifyToken , async (req, res) => {
    const {email} = req.params;

    const org = await Org.find({email: email});
    if(!org) {
        return res.status(404).json({ error: 'No org with that email' });
    }
    else{
        res.status(200).json(org);
    }
});

// Create a course
router.post('/create/course', verifyToken ,async (req, res) => {
    
    const {
        owner = req.user.name,
        name,
        description,
        members = []
    } = req.body;

    // try {
        const course = await Course.create(req.body);
        res.status(200).json(course);
    // }
    // catch (err) {
    //     res.status(400).json({ error: err.message });
    // }
});

// Update one course
router.patch("/update/course/:name", verifyToken, async (req, res) => {

    const {name} = req.params

    const course = await Course.findOneAndUpdate({name: name}, {
        ...req.body
    }, {new: true})

    if (!course) {
        res.status(404).json({error: 'No such course'})
    }
    else {
        res.status(200).json(course)
    }
});

// Delete one course
router.delete("/delete/course/:name", verifyToken, async (req, res) => {

    const {name} = req.params

    const course = await Course.findOneAndDelete({name: name})

    if (!course) {
        res.status(404).json({error: 'No such course'})
    }
    else {
        res.status(200).json(course)
    }
});

// // Delete an org
// router.delete('/delete/org/:id',verifyToken ,async (req, res) => {
//     const {id} = req.params;

//     const org = await Org.findOneAndDelete({id: id});
//     if(!org) {
//         return res.status(404).json({ error: 'No such org' });
//     }
//     else{
//         res.status(200).json({ message: 'Org deleted successfully' });
//     }
// });

// Update an org
router.patch('/update/org/:email', verifyToken ,async (req, res) => {
    const{email} = req.params;

    const org = await Org.findOneAndUpdate({email: email}, {
        ...req.body
    }, {new: true})

    if(!org) {
        return res.status(404).json({ error: 'No org with that email' });
    }
    else{
        res.status(200).json(org);
    }

});

// WIP fix this
router.post('/forgot_password/org', async (req, res) => {
  const { email } = req.body;

  try {
    const org = await Org.findOne({ email });

    if (!org) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    org.passwordResetToken = token;
    org.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await org.save();

    const resetUrl = `https://example.com/reset-password?token=${token}`;
    const message = `Click here to reset your password: ${resetUrl}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 4000,
      secure: false,
      auth: {
        org: 'your-email@gmail.com',
        password: 'your-email-password'
      }
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: org.email,
      subject: 'Password Reset Request',
      text: message
    };

    transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' , error: err});
  }
});


module.exports = router;



