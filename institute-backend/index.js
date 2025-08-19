const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const staffRoutes = require('./routes/staffRoutes');
const courseRoutes = require('./routes/courseRoutes');

app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/courses', courseRoutes);


app.get('/', (req, res) => {
  res.send('Institute backend is running ');
});


// app.get('/login', (req, res) => {
//   res.send('Login page');
// });

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
