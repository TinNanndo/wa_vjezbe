import express from "express";
import { connectToDatabase } from '../db.js';

const router = express.Router();
const db = await connectToDatabase();

let tasks = [
    {
      id: 1,
      naslov: "Kupiti kruh",
      opis: "Idi kupiti kruh danas",
      zavrsen: false,
      tags: ['polako']
    },
    {
      id: 2,
      naslov: "Naučiti Vue.js",
      opis: "Prouči malo Vue.js dokumentaciju",
      zavrsen: false,
      tags: ['hitno', 'faks']
    },
    {
      id: 3,
      naslov: "Riješi zadaću iz UPP-a",
      opis: "Please natjeraj se riješiti zadaću iz UPP-a, moraš i taj kolegij proći!",
      zavrsen: false,
      tags: ['hitno', 'faks']
    },
  ];

router.get('/', async(req, res) =>{
    const task_collection = db.collection('tasks');
    let taskCollected = await task_collection.find().toArray();
    res.status(200).json(tasks);
});

router.post('/', async (req, res) =>{
    console.log('Primljen zahtjev');
    let podaci = req.body;

    try{
        let result = await db.collection('tasks').insertMany(podaci);
        res.status(200).json({ insertCollected: result.insertedCount });
    } catch(error){
        console.log(error);
        res.status(400).json({ error : error.message });    
    }

});

export default router;
