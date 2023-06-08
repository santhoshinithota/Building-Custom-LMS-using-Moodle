require('dotenv').config()
const jwt = require('jsonwebtoken');
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.js')
const orgRoutes = require('./routes/org.js');
const authRoutes = require('./controllers/auth.js')
const courseRoutes = require('./routes/course.js');
const lessonRoutes = require('./routes/lesson.js')
const lectureRoutes = require('./routes/lecture.js')
const unitRoutes = require('./routes/unit.js')
const verifyToken  = require('./middleware/auth.js');
const cookieParser = require('cookie-parser')

// express app
const app = express()

app.use(cookieParser())

// middleware
app.use(express.json())

app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

// Routes
app.use('/api/user', userRoutes);
app.use('/api/org', orgRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/register', authRoutes);
app.use('/api/lesson', lessonRoutes);
app.use('/api/lecture', lectureRoutes);
app.use('/api/unit', unitRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		// listen for requests
		app.listen(process.env.PORT, () => {
			console.log('listening on port ' + `${process.env.PORT}`)
		})
	})
	.catch((error) => {
		console.log(error)
	})

	
// Endpoint to retrieve email and role from token
app.get('/api/auth', verifyToken, (req, res) => {
	const { email, role } = req.user;
	res.status(200).send({ email, role });
  });

