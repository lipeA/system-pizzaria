import express, {Request, Response, NextFunction, json} from 'express';
import 'express-async-errors';  // sempre colocar na 2º importação. recomendação!
import cors from 'cors';

import { router } from './routes/route';



const app = express();
app.use(express.json());
app.use(cors());
app.use(router);



// todas as rotas irao passar por esse mid.
// fazendo a travativa de erros.
app.use((err: Error, req: Request, res:Response, next:NextFunction)=>{

    // se for uma instancia do tipo error
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
       status: "error",
       message: "Internal server error." 
    });

});


app.listen(3333, ()=>{
    console.log("servidor rodando! http://localhost:3333/")
})