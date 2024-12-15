import express from 'express';
const { json } = express;
import { connectToDatabase } from './db.js';
import { ObjectId } from 'mongodb';

const app = express();
const db = await connectToDatabase();

app.use(express.json());

// root get

app.get('/', (req, res) => {
    res.send('Pizza app');
});

// pizze get

app.get('/pizze', async (req, res) => {
    let pizze_collection = db.collection('pizze');
    let cijena_query = req.query.cijena;
    let naziv_query = req.query.naziv;

    if(!cijena_query && !naziv_query){
        let pizze = await pizze_collection.find().toArray();
        res.status(200).json(pizze);
    }

    try{
        let pizze = await pizze_collection.find().sort({ cijena: Number(cijena_query), naziv: Number(naziv_query) }).toArray();
        res.status(200).json(pizze);
    } catch(error){
        console.log(error.errorResponse);
        res.status(400).json({ error: error.errorResponse });
    }
});

// pizze put

app.put('/pizze', async(req, res) => {
    let pizze_collection = db.collection('pizze');
    let noviMenu = req.body;

    try{
        await pizze_collection.deleteMany({});
        let result = await pizze_collection.insertMany(noviMenu);
        res.status(200).json({ insertedCount: result.insertedCount });
    } catch(error){
        console.log(error.errorResponse);
        res.status(400).json({ error: errorResponse });
    }
});

// pizze post

app.post('/pizze', async (req, res) => {
    let pizze_collection = db.collection('pizze');
    let novaPizza = req.body;
    
    try {
      let result = await pizze_collection.insertOne(novaPizza);
      res.status(201).json({ insertedId: result.insertedId });
    } catch (error) {
      console.log(error.errorResponse);
      res.status(400).json({ error: error.errorResponse });
    }
});

// pizze patch

app.patch('/pizze', async (req, res) => {
    let pizze_collection = db.collection('pizze');
  
    try {
      let result = await pizze_collection.updateMany({ cijena: { $lt: 15 } }, { $inc: { cijena: 2 } });
      res.status(200).json({ modifiedCount: result.modifiedCount });
    } catch (error) {
      console.log(error.errorResponse);
      res.status(400).json({ error: error.errorResponse });
    }
});

// pizze delete

app.delete('/pizze', async (req, res) => {
    let pizze_collection = db.collection('pizze');
  
    try {
      let result = await pizze_collection.deleteMany({}); // brišemo sve pizze iz kolekcije
      res.status(200).json({ deletedCount: result.deletedCount });
    } catch (error) {
      console.log(error.errorResponse);
      res.status(400).json({ error: error.errorResponse });
    }
});

// pizze/naziv get

app.get('/pizze/:naziv', async (req, res) =>{
    let pizze_collection = db.collection('pizze');
    let naziv_param = req.params.naziv;
    let pizza = await pizze_collection.findOne({ naziv: naziv_param });

    res.status(200).json(pizza);
});

// pizze/naziv patch

app.patch('/pizze/:naziv', async (req, res) => {
    let pizze_collection = db.collection('pizze');
    let naziv_param = req.params.naziv;
    let novaCijena = req.body.cijena;

    try{
        let result = await pizze_collection.updateOne({ naziv: naziv_param }, { $set: { cijena: novaCijena } });
        
        if(result.modifiedCount === 0){
            return res.status(400).json({ error: 'Pizza nije pronadena' });
        }
        
        res.status(200).json({ modifiedCount: result.modifiedCount });
    } catch(error){
        console.log(error.errorResponse);
        res.status(400).json({ error: error.errorResponse });
    }
});

// pizze/naziv delete

app.delete('/pizze/:naziv', async(req, res) => {
    let pizze_collection = db.collection('pizze');
    let naziv_param = req.params.naziv;

    try{
        let result = await pizze_collection.deleteOne({ naziv: naziv_param });
        res.status(200).json({ deletedCount: result.deletedCount });
    } catch(error){
        console.log(error.errorResponse);
        res.status(400).json({ error: error.errorResponse });
    }
});

// narudzbe get

app.get('/narudzbe', async(req, res) => {
    let narudzba_collection = db.collection('narudzbe');
    let narudzbe = await narudzba_collection.find().toArray();

    if (narudzbe.length === 0){
        return res.status(404).json({ error: 'Nema narudzbe' });
    }

    res.status(200).json(narudzbe);
});

// narudzbe/id get

app.get('/narudzbe/:id', async(req, res) =>{
    let narudzba_collection = db.collection('narudzbe');
    let id_param = req.params.id;
    let narudzba = await narudzba_collection.findOne({ _id: new ObjectId(id_param) });

    if(!narudzba){
        return res.status(400).json({ error: 'Narudzba nije pronadena' });
    }

    res.status(200).json(narudzba);
});

app.patch('/narudzbe/:id', async(req, res) =>{
    let narudzba_collection = db.collection('narudzbe');
    let id_param = req.params.id;
    let noviStatus = req.body.status;

    try{
        let result = await narudzba_collection.updateOne({ _id: new ObjectId(id_param) }, { $set: { status: noviStatus } });
        
        if(result.modifiedCount === 0){
            return res.status(404).json({ error: 'Narudzba nije pronadena' });
        }
        
        res.status(200).json({ modifiedCount: result.modifiedCount });
    } catch(error){
        console.log(error.errorResponse);
        res.status(400).json({ error: error.errorResponse });
    }
});

app.post('/narudzbe', async(req, res) =>{
    let pizze_collection = db.collection('pizze');
    let dostupne_pizze = await pizze_collection.find().toArray();
    let narudzba_collection = db.collection('narudzbe');
    let novaNarudzba = req.body;

    let obavezniKljucevi = ['kupac', 'adresa', 'broj_telefona', 'narucene_pizze'];
    let obavezniKljuceviStavke = ['naziv', 'količina', 'veličina'];

    if(!obavezniKljucevi.every(kljuc => kljuc in novaNarudzba)){
        return res.status(400).json({ error: 'Nedostaju obavezni kljucevi' });
    }

    if(!novaNarudzba.narucene_pizze.every(stavka => obavezniKljuceviStavke.every(kljuc => kljuc in stavka))){
        return res.status(400).json({ error: 'Nedostaju obavezni kljucevi u stavci narudzbe' });
    }

    if(!novaNarudzba.narucene_pizze.every(stavka => {
        return Number.isInteger(stavka.količina) && stavka.količina > 0 && ['mala', 'srednja', 'velika'].includes(stavka.veličina);
    })){
        return res.status(400).json({ error: 'Neispravni podaci u stavci narudzve' });
    }

    // provjera pizze
    if(!novaNarudzba.narucene_pizze.every(stavka => dostupne_pizze.some(pizza => pizza.naziv === stavka.naziv))){
        return res.status(400).json({ error: 'Odabrali ste pizzu koju nemamo u ponudi' });
    }

    try{
        let result = await narudzba_collection.insertOne(novaNarudzba);
        res.status(201).json({ insertedId: result.insertedId });
    } catch (error){
        console.log(error.errorResponse);
        res.status(400).json({ error: error.errorResponse });
    }
});

let PORT = 3000;
app.listen(PORT, error =>{
    if(error){
        console.log('Greska pri izradi: ', error);
    } else{
        console.log(`Slusam na http://localhost:${PORT}`);
    }
});