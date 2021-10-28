import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";

import mongoose from 'mongoose';
import router from './router/';

// require('dotenv').config({ path: __dirname+'/.env' });

// if (!process.env.PORT) {
//     process.exit(1);
// }

mongoose.connect("mongodb://localhost:27017/car-insurer").then(() => {
    const app = express();
    app.use(cors({
        origin: ['http://localhost:4200'],
        // credentials: true
    }));
    app.use(express.json());

    //TODO: config routes
    app.use('/api/insurance', router.insurance);

    app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
        console.error(err);
        res.status(500).send(err.message);
        console.log('*'.repeat(90))
    });

    const PORT: number = 7000;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });

})


//app.use(express.urlencoded({ extended: false }));

