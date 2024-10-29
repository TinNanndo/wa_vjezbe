const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const pizze = [
    { id: 1, naziv: 'Margherita', cijena: 6.5 },
    { id: 2, naziv: 'Capricciosa', cijena: 8.0 },
    { id: 3, naziv: 'Quattro formaggi', cijena: 10.0 },
    { id: 4, naziv: 'Šunka sir', cijena: 7.0 },
    { id: 5, naziv: 'Vegetariana', cijena: 9.0 }
];

app.get('/pizze', (req, res) => {
    res.json(pizze);
})

app.get('/pizza/:id', (req, res) => {
    const id_pizza = req.params.id;

    if (isNaN(id_pizza)) { 
        res.json({ message: "GRESKA! nema id-a" });
    }

    for(pizza of pizze){
        if(pizza.id === id_pizza){
            return res.json(pizza);
        }
    }
    res.json({message: "nema pizze"});
});



app.post('/naruci', (req, res) => {
    const narudzba = req.body;
    const kljucevi = Object.keys(narudzba);
    
    if (!(kljucevi.includes('pizza') && kljucevi.includes('velicina') && kljucevi.includes('kolicina'))) {
        res.send('Niste poslali sve potrebne podatke za narudžbu!');
        return;
    }

    res.send(`Vaša narudžba za ${narudzba.pizza} ${narudzba.velicina} ${narudzba.kolicina}  je uspješno zaprimljena!`);
});

app.listen(3000, (error) => {
    
    if(error) {
        console.log('greska');
    } else{
        console.log(`Server je pokrenut na => http://localhost:${PORT}`);
    }
});