import express, { Router } from 'express';
import fs from 'node:fs/promises';
import { runInContext } from 'node:vm';

const router = express.Router();
router.use(express.json());

function getData(){
    let podaci = fs.readFile('../data.json', (err, cont) =>{
        if(err) throw err;

    });

    return podaci;
}

let proizvodi = JSON.parse(await getData());

function postData(){

}

router.get('/', (req, res) => {
    res.status(200).json(proizvodi);
});

router.post('/', (req, res) =>{
    let id=req.body.id;
    let marka=req.body.marka;
    let model=req.body.model;
    let godina_proizvodnje=req.body.godina_proizvodnje;
    let zaliha=req.body.zaliha;
    let ocjena=req.body.ocjena;

    let lista_atr_nedostaju=[];

    if(id&&marka&&model&&godina_proizvodnje&&zaliha&&ocjena){
        proizvodi.forEach(proizvod => {
            if(proizvod.model === model&&proizvod.marka===marka&&proizvod.godina_proizvodnje===godina_proizvodnje){
                res.status(400).json("Greska! Proizvod vec postoji");
                throw("Greska");
            }
        });
        
        proizvodi.push({
            id: id,
            marka: marka,
            model: model,
            godina_proizvodnje: godina_proizvodnje,
            zaliha: zaliha,
            ocjena: ocjena
    });
    postData(proizvodi);
    res.status(201).json("Zapisano");
    } else{
        if(id===null) lista_atr_nedostaju.push("ID");
        if(marka===null) lista_atr_nedostaju.push("Marka");
        if(model===null) lista_atr_nedostaju.push("Model");
        if(godina_proizvodnje===null) lista_atr_nedostaju.push("Godina proizvodnje");
        if(zaliha===null) lista_atr_nedostaju.push("Zaliha");
        if(ocjena===null) lista_atr_nedostaju.push("Ocjena");
        res.status(400).json();
    }
});

router.get('/:id', (req, res) => {
    let id=req.params.id;
    let trazeni_proizvodi=proizvodi.filter((element)=>element.id===id);
    if(trazeni_proizvodi!=[]){
        let message="Uspjesno dohvacen proizvod s ID-om" +id;
        res.status(200).json({message: message, trazeni_proizvodi});
    } else{
        res.status(400).json({message: 'Porizvod ne postoji'});
    }
});

router.patch('/:id', (req, res)=>{
    let id= req.params.id;
    let za
});

export default router;