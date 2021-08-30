const db = require('../postgresPool');

const userController = {};

userController.createUser = (req, res, next) => {
  console.log('THIS IS TO CREATE NEW USERS ');
  const newUsersQ = 'INSERT INTO users (_id, name, email, password) VALUES ("234", "Edwin", "edwinl@gmail.com", "987")';
  db.query(newUsersQ)
    .then((data) => {
      res.locals.newUsersQuery = data.rows;
      next();
    })
    .catch((err) => next({
      log: `Error in userController.createUser when trying to get history: ERROR: ${err} `,
      message: { err: 'Error adding new user to DB' },
    }));
};

module.exports = userController;
