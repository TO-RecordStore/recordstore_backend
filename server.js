const express = require('express')
const app = express()
const PORT = 5001
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./routers/usersRouter')
const recordsRouter = require('./routers/recordsRouter')
const {user, password, db_name} = require('./vars');

app.listen(PORT, () => {
    console.log(`app listens at localhost:${PORT}`)
})

app.use(express.json())
app.use(cors())

const strConn = `mongodb+srv://${user}:${password}@cluster0.dkalb.mongodb.net/${db_name}?retryWrites=true&w=majority`;

mongoose.connect(
    strConn,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )
  .then(() => console.log("Connect to central db successfully"))
  .catch((err) => console.log("[ERROR] DB connection failed"));

  app.use('/users', usersRouter)
//   app.use('/records', recordsRouter)

  
  app.use((err,req,res,next) => {
      res.status(err.status || 500).send({
          error: {
			  message: err.message
			}
      })
  })