const express = require('express');

const exerciseController = require('../controllers/exerciseController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/',
  exerciseController.getExercises,
  (req, res) => {
    res.status(200).json(res.locals.exerciseQuery);
  },
);

router.get('/history',
  exerciseController.getHistory,
  (req, res) => res.status(200).json(res.locals.drillQuery),
);

router.get('/exercise/:id',
  exerciseController.getExerciseDetails,
  (req, res) => res.status(200).json(res.locals.exerciseDetails),
);

router.post('/exercise',
  exerciseController.createExercise,
  (req, res) => res.status(200).json(res.locals.newExercise),
);

router.post('/drill',
  exerciseController.createDrill,
  exerciseController.updateExerciseWithDrill,
  (req, res) => res.status(201).json(res.locals.createDrill),
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
    // Error when Logging in
    if (res.locals.error) {
      console.log('ERROR WHEN LOGGING IN');
      return res.status(400).json(res.locals.error);
    }
    return res.status(200).json(res.locals.authUser);
  },
);

module.exports = router;
