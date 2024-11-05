import express from 'express';
import { pizze } from './pizze.js'; // Import pizze array

const router = express.Router();

const narudzbe = [];
router.post('/', (req, res) => {
  const narudzba = req.body.narudzba;
  const klijent = req.body.klijent;

  const dozvoljeni_kljucevi = ['pizza', 'velicina', 'kolicina'];
  const potrebni_podaci = ['prezime', 'adresa', 'broj_telefona'];

  if (!Array.isArray(narudzba) || typeof klijent !== 'object') {
    return res.status(400).json({ message: 'Krivi JSON format! Morate poslati listu za narudžbu i objekt za klijenta' });
  }

  for (let podatak of potrebni_podaci) {
    if (!klijent[podatak]) {
      return res.status(400).json({ message: `Krivi JSON format! Nedostaje podatak: ${podatak}` });
    }
  }

  function getPizzaPrice(naziv) {
    const pizza = pizze.find(p => p.naziv === naziv);
    return pizza ? pizza.cijena : null;
  }

  // Provjera ispravnosti ključeva i vrijednosti za svaku stavku narudžbe
  let ukupna_cijena = 0;
  for (let stavka of narudzba) {
    let stavka_keys = Object.keys(stavka);

    // Provjera da svi ključevi postoje i da su ispravni
    if (!stavka_keys.every(kljuc => dozvoljeni_kljucevi.includes(kljuc)) || !dozvoljeni_kljucevi.every(kljuc => stavka_keys.includes(kljuc))) {
      return res.status(400).json({ message: 'Krivi JSON format! Nedostaju ili su neispravni ključevi u narudžbi' });
    }

    const { pizza, velicina, kolicina } = stavka;

    const pizzaPrice = getPizzaPrice(pizza);
    if (pizzaPrice === null) {
      return res.json({ message: `Pizza ${pizza} nije dostupna u jelovniku` });
    }

    ukupna_cijena += pizzaPrice * kolicina;
  }

  const narudzba_opis = narudzba.map((stavka, index) => `pizza_${index + 1}_naziv ${stavka.pizza} (${stavka.velicina})`).join(' i ');

  narudzbe.push({ klijent, narudzba, ukupna_cijena });

  return res.json({
    message: `Vaša narudžba za ${narudzba_opis} je uspješno zaprimljena!`,
    prezime: klijent.prezime,
    adresa: klijent.adresa,
    ukupna_cijena: ukupna_cijena
  });
});

export default router;