/**
 * Backend server for Observatorio de Violencia hacia personas LGBTI+ de Honduras KAI+
 * Provides API endpoints with statistics data from MongoDB Atlas free cluster
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variables from .env.dotenv or export manually before running
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB schema for statistics
const Schema = mongoose.Schema;

const StatisticSchema = new Schema({
  category: { type: String, required: true }, // e.g. 'violencia-generalizada'
  historical: [{ year: Number, value: Number }],
  periods: [{ period: String, value: Number }]
});

const Statistic = mongoose.model('Statistic', StatisticSchema);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('<h1>Observatorio de Violencia hacia personas LGBTI+ de Honduras KAI+ API</h1><p>API running. Use /api endpoints to get statistics data.</p>');
});

/**
 * Utility function for response with data or 404
 */
async function getStatsByCategory(category, res) {
  try {
    const data = await Statistic.findOne({ category });
    if (!data) return res.status(404).json({ error: 'Data not found' });
    return res.json({
      historical: data.historical,
      periods: data.periods
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}

// API endpoints
app.get('/api/violencia-generalizada', async (req, res) => {
  await getStatsByCategory('violencia-generalizada', res);
});

app.get('/api/muertes-violentas', async (req, res) => {
  await getStatsByCategory('muertes-violentas', res);
});

app.get('/api/personas-desaparecidas', async (req, res) => {
  await getStatsByCategory('personas-desaparecidas', res);
});

app.get('/api/asistencia-refugiadas', async (req, res) => {
  await getStatsByCategory('asistencia-refugiadas', res);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

