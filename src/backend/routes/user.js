const express = require('express')
const User = require('../models/userSchema')
const Org = require('../models/orgSchema')
const Course = require('../models/courseSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const verifyToken = require('../middleware/auth.js');

const router = express.Router()

// forgot password left
// Need to salt/hash password while registering
// Need to add back verifyTokens

// GET all users
// router.get('/', async (req, res) => {
// 	const users = await User.find({})

// 	try {
// 		res.status(200).json(users)
// 	}
// 	catch (error) {
// 		res.status(400).json({error: error.message})
// 	}
// })

// // LOGIN Check if username+password are correct combination., return true if correct, false if incorrect
// // Used by api.login/api.login_user to check if name+pass is correct
// router.get('/login/user/:email/:password', async (req, res) => {
// 	const {email, password} = req.params

// 	const user = await User.findOne({email: email})
// 	if (!user) {
// 		res.status(404).json({error: 'No such user'})
// 	}
// 	else {
//         const isMatch = await bcrypt.compare(password,user.password);   /* using becrypt to compare the password that is entered and the user password that is saved in the database */
// 		if (isMatch) {
// 			res.status(200).json({res: true}) // Email & Password are correct
// 		}
// 		else {
// 			res.status(500).json({res: false}) // Email & Password are incorrect
// 		}
// 	}
// })


router.post('/login/user/', async (req, res) => {
    // try {
        const { email, password } = req.body

        if (!password) {
            return res
                .status(400)
                .send(
                    `PASSWORD IS REQUIRED`
                );
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send(`NO USER FOUND`);
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send(`PASSWORD IS INCORRECT`);
        }

        const token = jwt.sign({ email: user.email, role: 'teacher' }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        //return user and token to client, exclude hashed password
        user.password = undefined;
        // send token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, //solo funciona en https
        });
        //send user as json response
        res.status(200).json(user);
    // } catch (error) {
    //     return res.status(400).send('ERROR. TRY AGAIN.');
    // }
});

// GET a single user's org
// Used by api.get_current_user_org
router.get('/user/org', verifyToken, async (req, res) => {
  const email = req.user.email;

  const user = await User.findOne({email: email})
  if (!user) {
    res.status(404).json({error: 'No such user'})
  }
  else {
    const org = await Org.findOne({name: user.organization})
    if (!org) {
      res.status(404).json({error: 'No such Org'})
    }
    else {
      res.status(200).json(org)
    }
  }
})

// GET a single user profile
// Used by api.get_current_user_profile
router.get('/user/:email', verifyToken, async (req, res) => {
	const {email} = req.params

	const user = await User.findOne({email: email})
	if (!user) {
		res.status(404).json({error: 'No such user'})
	}
	else {
		res.status(200).json(user)
	}
})

// GET_USER_ALL_COURSES gets all courses of a user
// Used by api.get_current_user_courses to get all courses of the user
router.get('/user/courses/:email', verifyToken, async (req, res) => {
	const {email} = req.params

	const user = await User.findOne({email: email})
	if (!user) {
		res.status(404).json({error: 'No such user'})
	}
	else {
		res.status(200).json(user.courses)
	}
})


// JOIN a course but select only email,name,description,organization,image_url from the database using tokenvrification
// Used by api.join_course to join user to course and vice versa
router.post("/course/join/:email", verifyToken, async (req, res) => {
    const { name } = req.body; // Course name, since Course ID does not exist
    // Unnescessary since email is params const { email } = req.body; // username of member leaving course
    
    try {
        const course = await Course.findOne({ name: name });
		const user = await User.findOne({email: req.params.email})

		const existing = await course.members.includes(req.params.email)
		if (existing) {
			res.status(400).json({message: "Already part of course"})
		}
		else {
			user.courses.push(name);
			course.members.push(req.params.email)

			const updatedCourse = await course.save();
			const updatedUser = await user.save();
			// Need to check for duplicate

			res.status(200).json({updatedCourse, updatedUser});
		}
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Leave a course but select only email,name,description,organization,image_url from the database using tokenvrification
// Used by api.leave_course to remove user from course and vice versa
// router.post("/course/leave/:email", async (req, res) => {
//     const { name } = req.body; // Course name, since Course ID does not exist
    
//     try {
//         const course = await Course.findOne({ name: name });
// 		const user = await User.findOne({email: req.params.email})
		
// 		course.members = course.members.pop({email: req.params.email});
// 		user.courses = user.courses.pop({name: name})

// 		const updatedCourse = await course.save();
// 		const updatedUser = await user.save();

// 		res.status(200).json({updatedCourse, updatedUser});

//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// WIP Add verifyToken And make it work
router.post("/course/leave/:email", async (req, res) => {
    const { name } = req.body; // Course name, since Course ID does not exist
    
    try {
        const course = await Course.findOne({ name: name });
        const user = await User.findOne({ email: req.params.email });
        
        course.members = course.members.filter(member => member.email !== req.params.email);
        user.courses = user.courses.filter(course => course.name !== name);

        const updatedCourse = await course.save();
        const updatedUser = await user.save();

        res.status(200).json({ updatedCourse, updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE a user
router.delete('/user/delete/:email', verifyToken, async (req, res) => {
	const {email} = req.params

	const user = await User.findOneAndDelete({email: email})

	if (!user) {
		res.status(404).json({error: 'No such user'})
	}
	else {
		res.status(200).json(user)
	}
})

// UPDATE a user
// api.update_user_profile
router.patch('/user/update/:email', verifyToken, async (req, res) => {
	const {email} = req.params

	const user = await user.findoneandupdate({email: email}, {
		...req.body
	}, {new: true})

	if (!user) {
		res.status(404).json({error: 'No such user'})
	}
	else {
		res.status(200).json(user)
	}
})

// WIP Need to fix
router.post('/forgot_password/user', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `https://example.com/reset-password?token=${token}`;
    const message = `Click here to reset your password: ${resetUrl}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 4000,
      secure: false,
      auth: {
        user: 'your-email@gmail.com',
        password: 'your-email-password'
      }
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: user.email,
      subject: 'Password Reset Request',
      text: message
    };

    transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router