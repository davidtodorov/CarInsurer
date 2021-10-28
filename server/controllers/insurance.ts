import models from '../models';

import express, { Request, Response, NextFunction } from 'express';

export default {
    get: (req: Request, res:Response, next:NextFunction) => {
        models.insuranceModel.findOne();
    }
}
