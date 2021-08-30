const db = require('../postgresPool');

const userController = {};

// createUser adds a new user to the database
userController.createUser = (req, res, next) => {
  console.log('TRYING TO CREATE A NEW USER: ', req.body);

  const { name, email, password } = req.body;

  // Validate form data exists
  if (!name || !email || !password) {
    res.locals.error = { message: 'Missing SignUp Form Data!' };
    return next();
  }

  const newUserQ = `
  INSERT INTO users
  (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`;

  const params = [req.body.name, req.body.email, req.body.password];

  db.query(newUserQ, params)
    .then(({ rows: user }) => {
      console.log('CREATED NEW USER: ', user);
      res.locals.authUser = { name: user[0].name, email: user[0].email };
      return next();
    })
    .catch((err) => next({
      log: `Error in userController.createUser when trying create a new user: ERROR: ${err} `,
      message: { err: 'Error adding new user to DB' },
    }));
};

// verifyUser checks input login details from client
// and verifies the input details against those in DB
userController.verifyUser = (req, res, next) => {
  console.log('TRYING TO VERIFY USER LOGIN DETAILS', req.body);

  const { email, password } = req.body;
  // Validate form data exists:
  if (!email || !password) {
    res.locals.error = { message: 'Missing Login Form Data!' };
    return next();
  }

  // Get user from DB if they exist
  const userQ = `
  SELECT * FROM users
  WHERE email = $1
  LIMIT 1;
  `;

  db.query(userQ, [email])
    .then(({ rows: user }) => {
      console.log('USER DATA FROM DB: ', user);

      // If no result, user not in DB, return login error
      if (user.length === 0) {
        res.locals.error = {message: 'No account for that email address' };
        return next();
      }

      // If passwords do not match, return login error:
      if (user[0].password !== password) {
        res.locals.error = { message: 'Invalid username and/or password!' };
        return next();
      }

      // Login Successful
      res.locals.authUser = { name: user[0].name, email: user[0].email };
      return next();
    })
    .catch((err) => next({
      log: `Error in userController.verifyUser when trying find a user to login: ERROR: ${err} `,
      message: { err: 'Error verifying user' },
    }));
};

module.exports = userController;
