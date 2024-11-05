import express from 'express';

import pizzeRouter from './routes/pizze.js';
import narudzbeRouter from './routes/narudzbe.js';

const app = express();
app.use(express.json());

// Remove redundant pizze array definition

app.use('/pizze', pizzeRouter);
app.use('/narudzbe', narudzbeRouter);

let PORT = 3000;

app.listen(PORT, error => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server dela na http://localhost:${PORT}`);
  }
});