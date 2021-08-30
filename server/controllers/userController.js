const db = require('../postgresPool');

const userController = {};

// createUser adds a new user to the database
userController.createUser = (req, res, next) => {
  console.log('TRYING TO CREATE A NEW USER: ', req.body);
  const newUserQ = `
  INSERT INTO users
  (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *`;

  const params = [req.body.name, req.body.email, req.body.password];

  db.query(newUserQ, params)
    .then((data) => {
      console.log('CREATED NEW USER: ', data.rows);
      res.locals.newUsersQuery = data.rows;
      next();
    })
    .catch((err) => next({
      log: `Error in userController.createUser when trying create a new user: ERROR: ${err} `,
      message: { err: 'Error adding new user to DB' },
    }));
};

// verifyUser checks input login details from client
// and verifies the input details
userController.verifyUser = (req, res, next) => {
  console.log('TRYING TO VERIFY USER LOGIN DETAILS', req.body);
  return next();
};

module.exports = userController;
