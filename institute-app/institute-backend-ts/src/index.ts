import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

import userRoutes from './routes/userRoutes';
import studentRoutes from './routes/studentRoutes';
import staffRoutes from './routes/staffRoutes';
import courseRoutes from './routes/courseRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import batchRoutes from './routes/batchRoutes';

app.get('/', (_req, res) => {
  res.send('✅ Institute backend is running');
});

app.get('/api/debug-env', (_req, res) => {
  res.json({
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    NODE_ENV: process.env.NODE_ENV,
  });
});

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/batch', batchRoutes);

app.get('/api', (_req, res) => {
  res.send('✅ Institute backend is running');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
