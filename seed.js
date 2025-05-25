/**
 * Seed script to populate MongoDB Atlas with sample data
 * Usage: node seed.js
 */

require("dotenv").config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const StatisticSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g. 'violencia-generalizada'
  historical: [{ year: Number, value: Number }],
  periods: [{ period: String, value: Number }]
});

const Statistic = mongoose.model('Statistic', StatisticSchema);

const sampleData = [
  {
    category: 'violencia-generalizada',
    historical: [
      { year: 2016, value: 120 },
      { year: 2017, value: 98 },
      { year: 2018, value: 134 },
      { year: 2019, value: 145 },
      { year: 2020, value: 110 },
      { year: 2021, value: 99 },
      { year: 2022, value: 115 },
      { year: 2023, value: 130 }
    ],
    periods: [
      { period: 'Ene-Mar', value: 40 },
      { period: 'Abr-Jun', value: 35 },
      { period: 'Jul-Sep', value: 28 },
      { period: 'Oct-Dic', value: 27 }
    ]
  },
  {
    category: 'muertes-violentas',
    historical: [
      { year: 2016, value: 25 },
      { year: 2017, value: 30 },
      { year: 2018, value: 22 },
      { year: 2019, value: 35 },
      { year: 2020, value: 31 },
      { year: 2021, value: 28 },
      { year: 2022, value: 33 },
      { year: 2023, value: 26 }
    ],
    periods: [
      { period: 'Ene-Mar', value: 10 },
      { period: 'Abr-Jun', value: 7 },
      { period: 'Jul-Sep', value: 6 },
      { period: 'Oct-Dic', value: 8 }
    ]
  },
  {
    category: 'personas-desaparecidas',
    historical: [
      { year: 2016, value: 12 },
      { year: 2017, value: 15 },
      { year: 2018, value: 14 },
      { year: 2019, value: 18 },
      { year: 2020, value: 16 },
      { year: 2021, value: 10 },
      { year: 2022, value: 13 },
      { year: 2023, value: 11 }
    ],
    periods: [
      { period: 'Ene-Mar', value: 5 },
      { period: 'Abr-Jun', value: 3 },
      { period: 'Jul-Sep', value: 3 },
      { period: 'Oct-Dic', value: 4 }
    ]
  },
  {
    category: 'asistencia-refugiadas',
    historical: [
      { year: 2016, value: 90 },
      { year: 2017, value: 85 },
      { year: 2018, value: 95 },
      { year: 2019, value: 110 },
      { year: 2020, value: 115 },
      { year: 2021, value: 107 },
      { year: 2022, value: 120 },
      { year: 2023, value: 125 }
    ],
    periods: [
      { period: 'Ene-Mar', value: 35 },
      { period: 'Abr-Jun', value: 33 },
      { period: 'Jul-Sep', value: 27 },
      { period: 'Oct-Dic', value: 30 }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding...');

    // Clear existing
    await Statistic.deleteMany({});
    console.log('Deleted existing statistics');

    // Insert sample data
    await Statistic.insertMany(sampleData);
    console.log('Inserted sample statistics data');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Error in seeding:', error);
    process.exit(1);
  }
}

seed();
