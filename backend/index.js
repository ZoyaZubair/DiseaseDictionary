const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const PORT = 5000;

// Configure CORS to allow requests from your frontend domain
const corsOptions = {
  origin: 'https://disease-dictionary.vercel.app', // Replace with your actual frontend URL
  methods: ['GET'], // Specify allowed methods (GET, POST, etc.)
  allowedHeaders: ['Content-Type'], // Specify allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());

// Load diseases from CSV file into an array
let diseases = [];
fs.createReadStream('diseases.csv')
  .pipe(csv())
  .on('data', (row) => {
    diseases.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// API route to get disease information by name
app.get('/api/disease/:name', (req, res) => {
  const diseaseName = req.params.name.toLowerCase();
  const disease = diseases.find(d => d.name.toLowerCase() === diseaseName);

  if (disease) {
    res.json(disease);
  } else {
    res.status(404).send({ error: 'Disease not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
