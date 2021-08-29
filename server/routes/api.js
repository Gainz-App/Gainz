const express = require('express');

const exerciseController = require('../controllers/exerciseController');

const router = express.Router();

router.get('/',
  exerciseController.getExercises,
  (req, res) => res.status(200).json(res.locals.excerciseQuery),
);

// router.get('/history',
//   exerciseController.getHistory,
//   (req, res) => res.status(200).json(res.locals.drillQuery),
// );

// router.get('/createExercise',
//   gainzController.getNewExcercises,
//   (req, res) => res.status(200).json(res.locals.homeQuery),
// );

// router.get('/login',
//   gainzController.getLogin,
//   (req, res) => res.status(200).json({}),
// );

// router.get('/logout',
//   gainzController.getFilm,
//   (req, res) => res.status(200).json({}),
// );

// router.get('/signup',
//   gainzController.getFilm,
//   (req, res) => res.status(200).json({}),
// );

// router.post('/',
//   gainzController.exercises,
//   (req, res) => res.status(200),
// );

module.exports = router;