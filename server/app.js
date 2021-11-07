const express = require ('express');
const app = express();
const mongoose = require ('mongoose')
const morgan = require("morgan");
const dotenv = require ("dotenv");
const userRoutes = require('./routes/userRoutes')
const register = require('./routes/auth')
const appointment = require('./routes/appointment')

dotenv.config();

// mongoose.connect(
//   process.env.MONGO_URL,
//   { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify:false},
//   () => {
//     console.log("connected to database");
//   }
// );

mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true})
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

app.use(express.json())
app.use(morgan('tiny'));

//apis

app.use('/api/users',userRoutes)
app.use('/api/users',register )
app.use('/api/users/delete',userRoutes)

app.use('/api/users/appointment',appointment )
app.use('/api/users/appointment/getAll',appointment )
app.use('/api/users/appointment/delete',appointment )

app.listen(8000, ()=>{
  console.log('app started on port 8800') 
}) 