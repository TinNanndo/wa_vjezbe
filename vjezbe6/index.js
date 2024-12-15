import express from 'express';
const { json } = express;
import { connectToDatabase } from './db.js';

const app = express();
let db = await connectToDatabase;

app.use = express(json());

app.get('/', (req, res) => {
    res.send('Pizza app');
});

app.get('/pizze', async (req, res) => {
    let pizze_collection = db.collection('pizze');
    let allPizze = await pizze_collection.find().toArray();
    console.log(allPizze);

    res.status(200).json(allPizze);
});

app.get('pizze/:id', (req, res) =>{
    const id = req.params.id;
    const pizza = pizza.find(pizza => pizza.id === id);
    res.status(200).json(pizza);
});

let PORT = 3000;
app.listen(PORT, error =>{
    if(error){
        console.log('Greska pri izradi: ', error);
    } else{
        console.log(`Slusam na http://localhost:${PORT}`);
    }
});