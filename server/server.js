// Import required node modules
const express = require('express');
const path = require('path');

// Create express App:
const app = express();

const apiRouter = require('./routes/api');

app.use('/api', apiRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  // Serve webpack build files from
  app.use('/build', express.static(path.join(__dirname, '../build')));

  // Serve main html page
  app.use('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
  });
}

app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => console.log('Listening on port 3000'));
