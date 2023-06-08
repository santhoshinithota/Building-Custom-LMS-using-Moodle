const mongoose = require('mongoose')
const courseSchema = require('./courseSchema')

const Schema = mongoose.Schema

const userSchema = new Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	organization: {
		type: String,
		required: true
	},
	image_url: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	courses: [
		{
			  type: mongoose.Schema.Types.ObjectId,
			// type: courseSchema,
			ref: "Course",
		},
	],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);