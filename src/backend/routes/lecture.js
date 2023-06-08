const express = require("express");
const Course = require("../models/courseSchema");
const Lesson = require("../models/lessonSchema");
const Lecture = require("../models/lectureSchema");
const Unit = require("../models/unitSchema");

const verifyToken = require("../middleware/auth.js");
const app = express();

const router = express.Router();

// creating a lecture
router.post(
  "/create/:lesson_name",
  verifyToken,
  async (req, res) => {
    const { course_name } = req.body;
    const { unit_name } = req.body;
    const { lecture_name } = req.body;
    const { lesson_name } = req.body;

    try {
      const course = await Course.findOne({ name: course_name });
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const unit = await Unit.findOne({ name: unit_name });
      if (!unit) {
        return res.status(404).json({ message: "Unit not found" });
      }

      const lesson = await Lecture.findOne({ name: lesson_name });
      if (!lesson) {
        return res.status(404).json({ message: "Unit not found" });
      }

      const lecture = await Lecture.create({
        name: lecture_name,
        lesson: lesson.name,
        unit: unit.name,
        course: course.name,
      });

      course.units.lessons.lectures.push(lecture.name);
      await lesson.save();
      res.status(200).json({ lecture });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// deleting a lecture
router.delete(
  "/delete/:course_name/:unit_name/:lesson_name/:lecture_name",
  async (req, res) => {
    const course_name = req.params.course_name;
    const unit_name = req.params.unit_name;
    const lesson_name = req.params.lesson_name;
    const lecture_name = req.params.lecture_name;

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

      const lesson = unit.lessons.find(
        (lesson) => lesson.name.toString() === lesson_name
      );
      if (!lesson) {
        return res.status(404).json({
          error: `Lesson with name '${lesson_name}' not found in unit '${unit_name}' in course '${course_name}'.`,
        });
      }

      const lectureIndex = lesson.lectures.findIndex(
        (lecture) => lecture.name === lecture_name
      );
      if (lectureIndex === -1) {
        return res.status(404).json({
          error: `Lecture '${lecture_name}' not found in lesson with name '${lesson_name}' in unit with name '${unit_name}' in course '${course_name}'.`,
        });
      }

      lesson.lectures.splice(lectureIndex, 1);
      await course.save();

      res.json({
        message: `Lecture '${lecture_name}' deleted from lesson with name '${lesson_name}' in unit with name '${unit_name}' in course '${course_name}'`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// get all lectures in a lesson of a unit of a course
router.get("/:course_name/:unit_name/:lesson_name/lectures", async (req, res) => {
  const course_name = req.params.course_name;
  const unit_name = req.params.unit_name;
  const lesson_name = req.params.lesson_name;

  try {
    const course = await Course.findOne({ name: course_name });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const unit = course.units.find((unit) => unit.name === unit_name);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    const lesson = unit.lessons.find((lesson) => lesson.name === lesson_name);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    const lecture = await Unit.find({}, "type name url");
    res.status(200).json(lecture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

