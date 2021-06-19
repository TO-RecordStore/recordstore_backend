const env = require('./config/config');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const cors = require('cors');
const usersRouter = require('./routers/usersRouter');
const recordsRouter = require('./routers/recordsRouter');
const imagesRouter = require('./routers/imagesRouter');
const ordersRouter = require('./routers/ordersRouter');
const meRouter = require('./routers/meRouter');
const cookiesParser = require('cookie-parser');

// MONGO CONNECTION

require('./utilities/dbConnection');

// EXPRESS SETUP

app.listen(PORT, () => {
  console.log(`👂 app listens at localhost:${PORT}`);
});

app.use(express.json());
app.use(
  cors({
    origin: env.frontendOrigin || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookiesParser());
app.use('/statics', express.static('statics'));

// API ROUTES

app.use('/users', usersRouter);
app.use('/records', recordsRouter);
app.use('/images', imagesRouter);
app.use('/orders', ordersRouter);
app.use('/me', meRouter);

// EXPRESS ERROR HANDLER

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});
