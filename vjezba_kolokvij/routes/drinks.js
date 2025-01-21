import express from 'express';
import { body, query, param, check, validationResult } from 'express-validator';

const router = express.Router();
import { connectToDatabase } from '../db.js';

const db = await connectToDatabase();


router.get('/', async (req, res) =>{
    let drinks_collection = db.collection('drinks');
    let results = await drinks_collection.find().toArray();

    res.status(200).json(results);
});

router.get('/:id', async (req, res) =>{
    let id_params = req.params.id;
    
    let drinks_collection = db.collection('drinks');
    let results = await drinks_collection.findOne({ id: id_params});

    res.status(200).json(results);
});

router.post('/', [
    body().notEmpty().withMessage('Nedostaju podaci'),
    check('naziv').notEmpty().isLength({ min: 3, max: 50 }).isString().withMessage('Nedostaje naziv'),
    check('zapremina').notEmpty().isNumeric().isFloat({ min: 0.1 }).withMessage('Nedostaje zapremina'),
    check('cijena').notEmpty().isFloat().isFloat({ min: 0.5 }).withMessage('Nedostaje cijena'),
    check('kolicina').notEmpty().isNumeric().isInt({ min: 50 }).withMessage('Nedostaje kolicina'),
    ], async (req, res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array() });
    }

    let podaci = req.body;

    let drinks_collection = db.collection('drinks');
    let results = await drinks_collection.insertOne(podaci);

    res.status(200).json(results);
});

export default router;