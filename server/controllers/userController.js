const db = require('../postgresPool');
const bcrypt = require('bcrypt');

// bcrypt settings
const SALT_ROUNDS = 10;

const userController = {};

// createUser adds a new user to the database
userController.createUser = (req, res, next) => {
  console.log('TRYING TO CREATE A NEW USER: ', req.body);

  const { name, email, password } = req.body;

  // Validate form data exists
  if (!name || !email || !password) {
    res.locals.error = { message: 'Please enter all fields!' };
    return next();
  }

  // Make sure email does not already exist in database:
  const checkUserQ = `
  SELECT * FROM users
  WHERE email = $1
  LIMIT 1
  `;

  db.query(checkUserQ, [email])
    .then(({ rows: userExists }) => {
      if (userExists.length) {
        res.locals.error = { message: 'Email already in use, try logging in!' };
        throw new Error();
      }

      // Hash password using bcrypt:
      return bcrypt.hash(req.body.password, SALT_ROUNDS);
    })
    .then((hash) => {
      // Create new User
      const newUserQ = `
      INSERT INTO users
      (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;`;

      const params = [req.body.name, req.body.email, hash];
      return db.query(newUserQ, params);
    })
    .then(({ rows: user }) => {
      console.log('CREATED NEW USER: ', user);
      res.locals.authUser = { name: user[0].name, email: user[0].email, id: user[0]._id };
      return next();
    })
    .catch((err) => {
      // Handled login error to return with message
      if (res.locals.error) {
        return next();
      }
      return next({
        log: `Error in userController.createUser when trying create a new user: ERROR: ${err} `,
        message: { err: 'Error adding new user to DB' },
      });
    });
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
      if (!user.length) {
        res.locals.error = { message: 'No account for that email address' };
        throw new Error();
      }

      res.locals.unAuthUser = { name: user[0].name, email: user[0].email, id: user[0]._id };
      // Check if passwords match:
      return bcrypt.compare(password, user[0].password);
    })
    .then((passwordMatch) => {
      if (!passwordMatch) {
        res.locals.error = { message: 'Invalid username and/or password!' };
        throw new Error();
      }

      // Login Successful
      res.locals.authUser = res.locals.unAuthUser;
      return next();
    })
    .catch((err) => {
      // Handled login error to return with message
      if (res.locals.error) {
        console.log('HANDLED LOGIN ERROR');
        return next();
      }
      return next({
        log: `Error in userController.verifyUser when trying find a user to login: ERROR: ${err} `,
        message: { err: 'Error verifying user' },
      });
    });
};

module.exports = userController;
