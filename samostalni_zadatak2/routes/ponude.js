import express from 'express';
const router = express.Router();

let ponude = [];

router.post('/', (req, res) => {
    const { idNekretnine, ime, prezime, ponudaCijena, telefon } = req.body;
    const property = properties.find(p => p.id === parseInt(idNekretnine));
    if (!property) return res.status(404).json({ message: 'Nekretnina s navedenim ID-em ne postoji.' });

    if (!ime || !prezime || !ponudaCijena || !telefon) {
        return res.status(400).json({ message: 'Nedostaju podaci za ponudu.' });
    }
    
    const offer = {
        id: ponude.length + 1,
        idNekretnine,
        ime,
        prezime,
        ponudaCijena,
        telefon
    };
    ponude.push(offer);
    res.status(201).json(offer);
});

export default router;