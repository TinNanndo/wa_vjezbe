import express from 'express';
import ProizvodiRouter from './routes/proizvodi.js';

const app = express();
app.use(express.json());

let PORT = 3000;

app.use('/proizvodi', ProizvodiRouter);

app.listen(PORT, (error) =>{
    if(error){
        console.log(`Greska pri izradi, ${error}`);
    } else {
        console.log(`Server: http://loaclhost:${PORT}`);
    }
});