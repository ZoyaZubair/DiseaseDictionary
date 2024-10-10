const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const PORT = 5000;

app.use(cors());
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
