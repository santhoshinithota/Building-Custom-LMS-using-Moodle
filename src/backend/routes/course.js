const express = require("express");
const Course = require("../models/courseSchema");
const Org = require("../models/orgSchema");
const verifyToken = require("../middleware/auth.js");
const app = express();

const router = express.Router();

// Get all courses of org. If user, get all courses of user's org
router.get("/", verifyToken, async (req, res) => {

    if (role === 'teacher') {
      res.org = Org.findOne({name: req.user.organization})
    }
    else {
      res.org = Org.findOne({email: req.user.email})
    }

  // try {
    const courses = await Course.find({owner: res.org.name}, 'id name description owner');
    res.status(200).json(courses);
  // } catch (err) {
  //   res.status(400).json({ message: err.message });
  // }
});

// Get course details but select only id,name,description,owner from the database
router.get("/course/details/:name", verifyToken, async (req, res) => {
  const {name} = req.params;

  try {
    const courses = await Course.findOne({name: name}, 'id name description owner');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
