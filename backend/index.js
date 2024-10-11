// Existing code in your backend server file (index.js or app.js)

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend communication
app.use(cors({
  origin: 'https://your-frontend-url.com' // Replace with the actual URL of your frontend
}));

app.use(express.json());

// Root route to display a message when accessing the root URL "/"
app.get('/', (req, res) => {
  res.send('Welcome to the Disease Dictionary API!');
});

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
