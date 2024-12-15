import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db.js';

const app = express();
app.use(express.json());
app.use(cors());

const db = await connectToDatabase();

app.get('/', (req, res) => {
  res.send('Pizza app');
});

// pizze get

app.get('/pizze', async (req, res) => {
  let pizze_collection = db.collection('pizze');
  let pizze_rezultati = await pizze_collection.find().toArray();
  console.log(pizze_rezultati);

  res.status(200).json(pizze_rezultati);
});

// pizze post

app.post('/pizze', async (req, res) => {
  let pizze_collection = db.collection('pizze');
  let novaPizza = req.body;
  
  let obavezniKljucevi = ['naziv', 'cijena', 'slika', 'sastojci'];

  if(!obavezniKljucevi.every(kljuc => kljuc in novaPizza)){
    return res.status(400).json({ error: 'Nedostaju obavezni kljucevi' });
  }

  if(!(Number.isInteger(novaPizza.cijena) && novaPizza.cijena > 0 && typeof novaPizza.sastojci === 'string')){
    return res.status(400).json({ error: 'Neispravni podaci u stavci unosa' });
  }

  try{  
    let result = await pizze_collection.insertOne(novaPizza);
    res.status(200).json({ insertedId: result.insertedId });
  } catch(error){
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

// narudzba get

app.get('/narudzba', async (req, res) => {
  let narudzba_collection = db.collection('pizza_narudzbe');
  let result = await narudzba_collection.find().toArray();

  res.status(200).json(result);
});

// narudzba post

app.post('/narudzba', async (req, res) => {
  let pizze_collection = db.collection('pizze');
  let narudzbe_collection = db.collection('pizza_narudzbe');
  let novaNarudzba = req.body;

  let obavezniKljucevi = ['ime', 'adresa', 'telefon', 'pizza_stavke'];
  let obavezniKljuceviStavke = ['naziv', 'kolicina', 'velicina'];

  if (!obavezniKljucevi.every(kljuc => kljuc in novaNarudzba)) {
    return res.status(400).json({ error: 'Nedostaju obavezni ključevi' });
  }

  if (!novaNarudzba.pizza_stavke.every(stavka => obavezniKljuceviStavke.every(kljuc => kljuc in stavka))) {
    return res.status(400).json({ error: 'Nedostaju obavezni ključevi u stavci narudžbe' });
  }

  if (!novaNarudzba.pizza_stavke.every(stavka => {
    return !isNaN(parseFloat(stavka.kolicina)) && stavka.kolicina > 0 && ['mala', 'srednja', 'velika'].includes(stavka.velicina);
  })
  ) {
    return res.status(400).json({ error: 'Neispravni podaci u stavci narudžbe' });
  }

  try {
    let ukupnaCijena = 0;
    
    for(let stavka of novaNarudzba.pizza_stavke){
      let pizza = await pizze_collection.findOne({ naziv: stavka.naziv });
      if(!pizza){
        return res.status(400).json({ error: `Neispravno ime pizze ${stavka.naziv}` });
      }
      ukupnaCijena += pizza.cijena * stavka.kolicina;
    }
    novaNarudzba.ukupnaCijena = ukupnaCijena;

    let result = await narudzbe_collection.insertOne(novaNarudzba);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

const PORT = 3000;
app.listen(PORT, error => {
  if (error) {
    console.log('Greška prilikom pokretanja servera', error);
  }
  console.log(`Slusa na: http://localhost:${PORT}`);
});
