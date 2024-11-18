import express from 'express';
import { Proizvod, proizvodi } from '../data.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(proizvodi);
});

router.get('/:id', (req, res) => {
  let id_proizvod = parseInt(req.params.id, 10);

  if (isNaN(id_proizvod)) {
    return res.status(400).json({ message: "Krivi podaci!" });
  }

  let proizvod = proizvodi.find(p => p.id === id_proizvod);

  if (!proizvod) {
    return res.status(400).json({ message: "Proizvod nije pronađen!" });
  }

  return res.status(200).json(proizvod);
});

export default router;