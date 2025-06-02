const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'https://zentrafi-frontend.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);
