import express, { json } from 'express';

let PORT = 3000;
const app = express();
app.use(express.json());

const pizza = [
    { id: 1, naziv: 'Margherita', cijena: 6.5 },
    { id: 2, naziv: 'Capricciosa', cijena: 8.0 },
    { id: 3, naziv: 'Quattro formaggi', cijena: 10.0 },
    { id: 4, naziv: 'Šunka sir', cijena: 7.0 },
    { id: 5, naziv: 'Vegetariana', cijena: 9.0 }
];

app.get('/pizze/:id', (req, res) =>{
  const id_pizze = req.params.id;

  for (pizza of pizze){
    if(pizza.id == id_pizze){
      res.json(pizza);
    }
  }
});

app.listen(PORT, error => {
    if (error) {
      console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
      console.log(`Server radi na http://localhost:${PORT}`);
    }
  });