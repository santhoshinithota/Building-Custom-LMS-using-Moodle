const express = require("express");
const Course = require("../models/courseSchema");
const Lesson = require("../models/lessonSchema");
const Lecture = require("../models/lectureSchema");
const Unit = require("../models/unitSchema");

const verifyToken = require("../middleware/auth.js");
const app = express();

const router = express.Router();

// creating a unit
router.post("/create", verifyToken, async (req, res) => {
  const { unit_name } = req.body;
  const { course_name } = req.body;

  // try {
    const course = await Course.findOne({ name: course_name });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const unit = await Unit.create({
      name: unit_name,
      course: course.name,
    });

    course.units.push(unit);
    await course.save();
    res.status(200).json({ unit });
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
});

// deleting an unit
router.delete("/delete/:course_name/:unit_name", async (req, res) => {
  const course_name = req.params.course_name;
  const unit_name = req.params.unit_name;

  try {
    // Find the course by name
    const course = await Course.findOne({ name: course_name });

    // If the course does not exist, return a 404 error
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the index of the unit to be deleted
    const unitIndex = course.units.findIndex((unit) => unit.name === unit_name);

    // If the unit does not exist, return a 404 error
    if (unitIndex === -1) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // Remove the unit from the units array
    course.units.splice(unitIndex, 1);

    // Save the updated course
    await course.save();

    // Return a success message
    res.json({ message: "Unit deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// get all units in a course
router.get("/:course_name/units", async (req, res) => {
  const course_name = req.params.course_name;

  try {
    const course = await Course.findOne({ name: course_name });

    // If the course does not exist, return a 404 error
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const units = await Unit.find({}, "description name image_url lessons");
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
