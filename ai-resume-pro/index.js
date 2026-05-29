require('dotenv').config();
const express = require('express');
const aiRoutes = require('./backend/routes/ai');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Routes
app.use('/api', aiRoutes);

app.get('/', (req, res) => {
  res.send('AI Resume Pro API is running');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
