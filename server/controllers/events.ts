import { Request, Response, NextFunction } from 'express';
import { IInsuranceEvent } from '../models/event';
import { app } from '..';


export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { insuranceId } = req.query;
        let result = await app.serviceContainer.eventService.getEvents(id, insuranceId as string);
        res.send(result);
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        let files = req.files;
        const reqModel = req.body as IInsuranceEvent;
        let result = await app.serviceContainer.eventService.createEvent(files, reqModel)
        return res.send(result);
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        let result = await app.serviceContainer.eventService.deleteEvent(id);
        res.send(result);
    }
}   