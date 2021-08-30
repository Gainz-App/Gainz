const express = require('express');

const exerciseController = require('../controllers/exerciseController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/',
  exerciseController.getExercises,
  (req, res) => {
    console.log('THIS IS RES LOCALS EXERQ', res.locals.exerciseQuery);
    res.status(200).json(res.locals.exerciseQuery);
  },
);

router.get('/history',
  exerciseController.getHistory,
  (req, res) => res.status(200).json(res.locals.drillQuery),
);

router.post('/exercise',
  exerciseController.createNewExercise,
  (req, res) => res.status(200).json(res.locals.newExercise),
);

router.post('/signup',
  userController.createUser,
  (req, res) => res.status(201).json(res.locals.newUsersQuery),
);

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
