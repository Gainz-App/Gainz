const db = require('../postgresPool');

const exerciseController = {};

exerciseController.getExercises = (req, res, next) => {
  console.log('IN GET EXERCISES')
  const exerciseQ = 'SELECT * FROM exercises';
  db.query(exerciseQ)
    .then((data) => {
      res.locals.excerciseQuery = data.rows;
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

exerciseController.getHistory = (req, res, next) => {
  console.log('IN GET HISTORY');
  const drillQuery = 'SELECT * FROM drills';
  db.query(drillQuery)
    .then((data) => {
      res.locals.drillQuery = data.rows;
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

exerciseController.createNewExercise = (req, res, next) => {
  console.log('IN CREATE NEW EXERCISE');
  console.log('REQUEST TO CREATE NEW EXERCISE', req.body);
  const createQ = `INSERT INTO exercises 
  (name, description, type_id, user_id, init_weight, init_reps, init_sets, last_weight, last_reps, last_sets) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *`;

  const params = [req.body.name, req.body.description, req.body.type_id, req.body.user_id, req.body.init_weight, req.body.init_reps, req.body.init_sets, req.body.init_weight, req.body.init_reps, req.body.init_sets];
  
  console.log(params);

  db.query(createQ, params)
    .then((data) => {
      res.locals.newExercise = data.rows[0];
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

module.exports = exerciseController;
