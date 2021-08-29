const db = require('../postgresPool.js');

const exerciseController = {};

exerciseController.getExercises = (req, res, next) => {
  const exerciseQ = 'SELECT * FROM exercises';
  db.query(exerciseQ)
    .then(data => {
      res.locals.excerciseQuery = data.rows;
      next();
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

exerciseController.getHistory = (req, res, next) => {
  const drillQuery = 'SELECT DATA FROM DRILL TABLE';
  db.query(drillQuery)
    .then(data => {
      res.locals.drillQuery = data.rows[0];
      next();
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

module.exports = exerciseController;