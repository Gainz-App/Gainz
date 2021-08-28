const db = require('../server/postgresPool.js');

const gainzController = {};

gainzController.getExcercises = (req, res, next) => {
  const exerciseQ = 'SELECT DATA FROM EXERCISE TABLE';
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


gainzController.getHistory = (req, res, next) => {
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

// gainzController.getNewExcercises = (req, res, next) => {
// rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, and population.
//   const homeIndex = req.query.id;
// const homeInfo = req.locals.homeQuery;
//SELECT pl.*, sp.homeworld_id FROM planets pl JOIN species sp ON sp.homeworld_id = pl._id WHERE ///{homeIndex} = pl._id`
//   const homeQ = '';
//   db.query(homeQ)
//     .then(data => {
//       res.locals.getNewExcercises = data.rows[0];
//       next();
//     })
//     .catch(err => {
//       console.log(err);
//       next();
//     });
// };

// gainzController.getLogin = (req, res, next) => {
//   // write code here

//   next();
// };

// gainzController.logout = (req, res, next) => {
//   const newCharQ = '';
//   console.log(req.body);
//   db.query(newCharQ)
//     // .then(data => {
//     // //   console.log(data);
//     //   res.locals.newCharIndex = data.rows[0];
//     //   next();
//     // })
//     .catch(err => {
//       console.log(err);
//       next();
//     });

// };
// gainzController.signup = (req, res, next) => {
//   const signupQ = '';
//   db.query(signupQ)
//     .catch(err => {
//       console.log(err);
//       next();
//     });
// };




module.exports = gainzController;