const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true // this will alow the source to accept cookies
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} ,(err) => {
  if(err)
    return console.log(err);
  console.log('MongoDB Connected');
});

// Routers
app.use('/auth', require('./routers/userRouter'));
app.use('/users', require('./routers/protectedRoutes'));
