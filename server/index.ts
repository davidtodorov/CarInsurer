import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import dotenv from "dotenv"

import mongoose, { ClientSession } from 'mongoose';
import routes from './config/routes';
import { ServiceContainer } from './services';
import path from 'path';

// require('dotenv').config({ path: __dirname+'/.env' });

// if (!process.env.PORT) {
//     process.exit(1);
// }

declare global {
    namespace Express {
        interface Application {
            serviceContainer: ServiceContainer;
            session: ClientSession
        }
    }
}


export const app: express.Application = express();

mongoose.connect("mongodb://WS460:27017,WS460:27018,WS460:27019/car-insurer?replicaSet=rs").then(async (db) => {
    app.serviceContainer = new ServiceContainer();
    
    app.use('/static', express.static(path.join(__dirname, 'public')));

    app.use(cors({
        origin: 'http://localhost:4200'
        //credentials: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    routes(app);

    app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
        console.error(err);
        res.status(500).send(err.message);
        console.log('*'.repeat(90))
    });

    const PORT: number = 7000;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});