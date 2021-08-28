const express = require('express');

const gainzController = require('../controllers/gainzController');

const router = express.Router();

router.get('/',
  gainzController.getExcercises,
  (req, res) => res.status(200).json(res.locals.excerciseQuery),
);

router.get('/history',
  gainzController.getHistory,
  (req, res) => res.status(200).json(res.locals.drillQuery),
);

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