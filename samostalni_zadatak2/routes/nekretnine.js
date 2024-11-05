import express from 'express'

const router = express.Router();
let nekretnine = [];

router.get('/', (req, res) => {
    res.json(nekretnine);
});

export default router;