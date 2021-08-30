const express = require('express');

const exerciseController = require('../controllers/exerciseController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/',
  exerciseController.getExercises,
  (req, res) => {
    //console.log('THIS IS RES LOCALS EXERQ', res.locals.exerciseQuery);
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
  (req, res) => {
    // Error when signing up
    if (res.locals.error) {
      return res.status(400).json(res.locals.error);
    }
    return res.status(201).json(res.locals.authUser);
  },
);

router.post('/login',
  userController.verifyUser,
  (req, res) => {
    // Error when signing up
    if (res.locals.error) {
      return res.status(400).json(res.locals.error);
    }
    return res.status(200).json(res.locals.authUser);
  },
);

module.exports = router;
