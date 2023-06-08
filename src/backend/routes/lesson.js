const express = require("express");
const Course = require("../models/courseSchema");
const Lesson = require("../models/lessonSchema");
const Lecture = require("../models/lectureSchema");
const Unit = require("../models/unitSchema");

const verifyToken = require("../middleware/auth.js");
const app = express();

const router = express.Router();

// creating a lesson
router.post(
  "/create",
  verifyToken,
  async (req, res) => {
    const { lesson_name } = req.body;
    const { unit_name } = req.body;
    const { course_name } = req.body;

    try {
      const course = await Course.findOne({ name: course_name });
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const unit = await Unit.findOne({ name: unit_name });
      if (!unit) {
        return res.status(404).json({ message: "Unit not found" });
      }

      const lesson = await Lesson.create({
        name: lesson_name,
        unit: unit.name,
        course: course.name,
      });

      course.units.lessons.push(lesson.name);
      await unit.save();
      res.status(200).json({ lesson });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


// deleting a lesson
router.delete(
  "/delete/:course_name/:unit_name/:lesson_name",
  async (req, res) => {
    const course_name = req.params.course_name;
    const unit_name = req.params.unit_name;
    const lesson_name = req.params.lesson_name;

    try {
      const course = await Course.findOne({ name: course_name });
      if (!course) {
        return res
          .status(404)
          .json({ error: `Course '${course_name}' not found.` });
      }

      const unit = course.units.find(
        (unit) => unit.name.toString() === unit_name
      );
      if (!unit) {
        return res.status(404).json({
          error: `Unit with name '${unit_name}' not found in course '${course_name}'.`,
        });
      }

      const lessonIndex = unit.lessons.findIndex(
        (lesson) => lesson.name === lesson_name
      );
      if (lessonIndex === -1) {
        return res.status(404).json({
          error: `Lesson '${lesson_name}' not found in unit with name '${unit_name}' in course '${course_name}'.`,
        });
      }

      unit.lessons.splice(lessonIndex, 1);
      await course.save();

      res.json({
        message: `Lesson '${lesson_name}' deleted from unit with name '${unit_name}' in course '${course_name}'`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// get all lessons in an unit of a course
router.get("/:course_name/:unit_name", async (req, res) => {
  const course_name = req.params.course_name;
  const unit_name = req.params.unit_name;

  try {
    const course = await Course.findOne({ name: course_name });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const unit = course.units.find((unit) => unit.name === unit_name);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    const lesson = await Unit.find({}, "description name lectures");
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
