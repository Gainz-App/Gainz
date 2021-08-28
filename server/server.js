// Import required node modules
const express = require('express');
const path = require('path');

// Create express App:
const app = express();

if (process.env.NODE_ENV === 'production') {
  // Serve webpack build files from
  app.use('/build', express.static(path.join(__dirname, '../build')));

  // Serve main html page
  app.use('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
  });
}

app.listen(3000, () => console.log('Listening on port 3000'));
