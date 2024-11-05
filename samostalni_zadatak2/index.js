import express from 'express';
import nekretnineRouter from './routes/nekretnine.js';
import ponudeRouter from './routes/ponude.js';


let PORT = 3000;
const app = express();
app.use(express.json());

app.use("/nekretnine", nekretnineRouter);
app.use("/ponude", ponudeRouter);

app.listen(PORT, error => {
    if (error){
        console.error(`Greska prilikon pokretanja ${error.message}`);
    } else {
        console.log(`Server je pokrenut na https://localhost:${PORT}`);
    }
});