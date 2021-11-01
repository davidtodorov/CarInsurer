import express from 'express';
import routes from '../routes';

export default (app: express.Application) => {
    app.use('/api/insurance', routes.insurance);

    app.use('*', (req, res, next) => res.send('<h1> Wrong route maybe? </h1>'));
};