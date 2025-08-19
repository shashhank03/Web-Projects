// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const userRoutes = require('./routes/userRoutes');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: process.env.DB_PASSWORD, 
//   database: 'institute_management',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('MySQL connection error:', err.message);
//     return;
//   }
//   console.log(' Connected to MySQL Database');
// });

// app.get('/', (req, res) => {
//   res.send('Institute Management API Running');
// });

// app.use('/api/users', userRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
