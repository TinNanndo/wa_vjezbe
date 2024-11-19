import express from 'express';
import fs from 'fs/promises'

const app = express();
app.use(express.json())

app.get('/zaposlenici', async (req, res) => {
    try {
        const data = await fs.readFile('zaposlenici.json', 'utf8');
        const zaposlenici = JSON.parse(data);

        res.status(200).send(zaposlenici);
    } catch (error) {
        console.error('Greska prilikom citanja', error);
        res.status(500).send('Greska prilikom citanja');
    }
});

app.get('/zaposlenici/:id', async (req, res) => {
    let id = req.params.id;

    try{
        const data = await fs.readFile('zaposlenici.json', 'utf8');
        const zaposlenici = JSON.parse(data);
        const zaposlenik = zaposlenici.find(zaposlenik => zaposlenik.id === id);

        if(zaposlenik){
            res.status(200).send(zaposlenik);
        } else{
            res.status(404).send('Zaposlenik nije pronaden');
        }
    } catch (error){
        console.error('Greska prilikom citanja', error);
        res.status(500).send('Greska prilikom citanja');
    }
});

app.get('/zaposlenici', async (req, res) => {
    let sortiraj_po_godini = req.query.sortiraj_po_godini;
    let pozicija_query = req.query.pozicija_query;

    try{
        const data = await fs.readFile('zaposlenici.json', 'utf8');
        const zaposlenici = JSON.parse(data);

        if(sortiraj_po_godini) {
            if(sortiraj_po_godini === 'uzlazno'){
                zaposlenici.sort((a, b) => a.godine_staza - b.godine_staza);
            } else if(sortiraj_po_godini === 'silazno'){
                zaposlenici.sort((a, b) => b.godine_staza - a.godine_staza);
            }
        }

        res.status(200).send(zaposlenici);
    } catch (error){
        console.error('Greska prilikom citanja', error);
        res.status(500).send('Greska prilikom citanja');
    }
});


let PORT = 3000;
app.listen(PORT, (error) => {
    if (error){
        console.error()
    } else {
        console.log(`http://localhost:${PORT}`)
    }
});