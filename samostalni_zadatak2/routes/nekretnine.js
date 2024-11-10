import express from 'express';
const router = express.Router();

let nekretnine = [];

router.get('/', (req, res) => {
    res.status(200).json(nekretnine);
});

router.get('/:id', (req, res) => {
    const property = nekretnine.find(p => p.id === parseInt(req.params.id));
    if (!property) return res.status(404).json({ message: 'Nekretnina nije pronađena.' });
    res.status(200).json(property);
});

router.post('/', (req, res) => {
    const { naziv, opis, cijena, lokacija, broj_soba, povrsina } = req.body;
    if (!naziv || !cijena || !lokacija || !broj_soba || !povrsina) {
        return res.status(400).json({ message: 'Nedostaju podaci o nekretnini.' });
    }
    const property = {
        id: nekretnine.length + 1,
        naziv,
        opis,
        cijena,
        lokacija,
        broj_soba,
        povrsina
    };
    nekretnine.push(property);
    res.status(201).json(property);
});

router.put('/:id', (req, res) => {
    const property = nekretnine.find(p => p.id === parseInt(req.params.id));
    if (!property) return res.status(404).json({ message: 'Nekretnina nije pronađena.' });

    const { naziv, opis, cijena, lokacija, broj_soba, povrsina } = req.body;
    if (!naziv || !cijena || !lokacija || !broj_soba || !povrsina) {
        return res.status(400).json({ message: 'Nedostaju podaci o nekretnini.' });
    }

    Object.assign(property, { naziv, opis, cijena, lokacija, broj_soba, povrsina });
    res.status(200).json(property);
});

router.patch('/:id', (req, res) => {
    const property = nekretnine.find(p => p.id === parseInt(req.params.id));
    if (!property) return res.status(404).json({ message: 'Nekretnina nije pronađena.' });

    Object.assign(property, req.body);
    res.status(200).json(property);
});

router.delete('/:id', (req, res) => {
    const index = nekretnine.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Nekretnina nije pronađena.' });

    nekretnine.splice(index, 1);
    res.status(204).send();
});

export default router;