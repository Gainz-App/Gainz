const db = require('../postgresPool');

const userController = {};

userController.createUser = (req, res, next) => {
  console.log('TRYING TO CREATE A NEW USER: ', req.body);
  const newUsersQ = 'INSERT INTO users (_id, name, email, password) VALUES ("234", "Edwin", "edwinl@gmail.com", "987")';
  db.query(newUsersQ)
    .then((data) => {
      res.locals.newUsersQuery = data.rows;
      next();
    })
    .catch((err) => next({
      log: `Error in userController.createUser when trying create a new user: ERROR: ${err} `,
      message: { err: 'Error adding new user to DB' },
    }));
};

module.exports = userController;
