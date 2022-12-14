const path = require('path');
const { TextEncoder, TextDecoder } = require("util");
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config({ path: '.dev-env' });
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const limit = require('express-limit').limit;


const csrf = require('csurf');
const csrfProtection = csrf();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'dev') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', csrfProtection, limit({
    max:    5,        // 5 requests
    period: 60 * 1000 // per minute (60 seconds)
}),(req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/',csrfProtection,  limit({
    max:    5,        // 5 requests
    period: 60 * 1000 // per minute (60 seconds)
}), (req, res) => res.send('Please set to dev'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
