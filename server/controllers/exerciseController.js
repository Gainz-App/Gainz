const db = require('../postgresPool');

const exerciseController = {};

exerciseController.getExercises = (req, res, next) => {
  console.log('IN GET EXERCISES');
  console.log(req.headers.user_id);
  //not quite right DB read command below, but gets us the types name we need! -Lindsay
  const exerciseQ = `SELECT exercises.*, types._id AS typesID, types.name AS typesName  FROM public.exercises LEFT OUTER JOIN public.types ON exercises.type_id = types._id WHERE user_id = ${req.headers.user_id}`;
  db.query(exerciseQ)
    .then((data) => {
      res.locals.exerciseQuery = data.rows;
      next();
    })
    .catch((err) => next({
      log: `Error in exerciseController.getExercises when trying to get exercises from DB: ERROR: ${err} `,
      message: { err: 'Error getting exercises from DB' },
    }));
};

exerciseController.getHistory = (req, res, next) => {
  console.log('IN GET HISTORY');
  const drillQuery = 'SELECT * FROM drills';
  db.query(drillQuery)
    .then((data) => {
      res.locals.drillQuery = data.rows;
      console.log('DRILL HISTORY: ', res.locals.drillQuery)
      next();
    })
    .catch((err) => next({
      log: `Error in exerciseController.getHistory when trying to get history: ERROR: ${err} `,
      message: { err: 'Error getting drill history from DB' },
    }));
};

exerciseController.createExercise = (req, res, next) => {
  console.log('REQUEST TO CREATE NEW EXERCISE', req.body);
  console.log('user id is: ', req.headers.user_id);
  const createQ = `INSERT INTO exercises
  (name, type_id, user_id, init_weight, init_reps, init_sets, last_weight, last_reps, last_sets)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *`;

  // CURRENTLY HARD CODING USERID HERE TO MAKE THIS WORK OK - CHANGE WHEN SESSIONS DONE
  const params = [req.body.name, req.body.type_id, req.headers.user_id, req.body.init_weight, req.body.init_reps, req.body.init_sets, req.body.init_weight, req.body.init_reps, req.body.init_sets];

  console.log(params);

  db.query(createQ, params)
    .then((data) => {
      res.locals.newExercise = data.rows[0];
      next();
    })
    .catch((err) => next({
      log: `Error in exerciseController.createNewExercise when trying to create a new exercise: ERROR: ${err} `,
      message: { err: 'Error creating exercise in DB' },
    }));
};

exerciseController.createDrill = (req, res, next) => {
  console.log('REQUEST TO CREATE NEW DRILL SET', req.body);
  console.log('REQUEST TO CREATE NEW DRILL SET header', req.headers.name)
  console.log('REQUEST TO CREATE NEW DRILL SET header', req.headers.type)
  const newDrillQ = `
  INSERT INTO drills 
  (exercise_id, name, type_name, weight, reps, sets, rest_interval) 
  VALUES ($1, $2, $3, $4, $5, $6 , $7) 
  RETURNING *;
  `;

  const drillParams = [req.body.exercise_id, req.headers.name, req.headers.type, req.body.weight, req.body.reps, req.body.sets, req.body.rest_interval];
  console.log('THIS IS DP', drillParams);

  db.query(newDrillQ, drillParams)
    .then((data) => {
      res.locals.createDrill = data.rows;
      next();
    })
    .catch((err) => next({
      log: `Error in exerciseController.createDrill when trying to create a new DRILL: ERROR: ${err} `,
      message: { err: 'Error creating DRILL in DB' },
    }));
};

// Updates exercise values with those from most recent drill
//update last weight, last set, last rep, last rest
exerciseController.updateExerciseWithDrill = (req, res, next) => {
  console.log('UPDATING EXERCISE WITH LATEST DRILL');

  const updateQ = `
    UPDATE exercises
    SET last_weight=$1, last_reps=$2, last_sets=$3, last_rest=$4
    WHERE _id=$5;
  `;

  const params = [req.body.weight, req.body.reps, req.body.sets, req.body.rest_interval, req.body.exercise_id];

  db.query(updateQ, params)
    .then((data) => {
      console.log('UPDATE DATA FROM DB: ', data.rows);
      return next();
    })
    .catch((err) => next({
      log: `Error in exerciseController.updateExerciseWithDrill when trying to update an exercise with drill data: ERROR: ${err} `,
      message: { err: 'Error updating exercise with drill in DB' },
    }));
};

exerciseController.getExerciseDetails = (req, res, next) => {
  console.log('TRYING TO GET EXERCISE DETAILS ', req.params);
  const detailsQ = `
    SELECT * FROM exercises
    WHERE _id = $1
    LIMIT 1;
  `;

  db.query(detailsQ, [req.params.id])
    .then((data) => {
      res.locals.exerciseDetails = data.rows[0];
      console.log('exercise details: ', res.locals.exerciseDetails)
      return next();
    })
    .catch((err) => next({
      log: `Error in exerciseController.getExerciseDetails when trying to GET DRILL data: ERROR: ${err} `,
      message: { err: 'Error getting exercise details from DB' },
    }));
};

module.exports = exerciseController;
