const mongoose = require('mongoose');
const env = require('../config/config');

const strConn = `mongodb+srv://${env.dbUser}:${env.dbPassword}@cluster0.dkalb.mongodb.net/${env.dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(strConn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('🔌 Connected to central db successfully'))
  .catch((err) => console.log('[ERROR] DB connection failed ☠️'));

module.exports = mongoose.connection;
