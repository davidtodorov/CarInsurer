import express from 'express';
import routes from '../routes';

export default (app: express.Application) => {
    app.use('/api/insurances', routes.insurance);

    app.use('/api/users', routes.user);

    app.use('/api/cars', routes.car);

    app.use('*', (req, res, next) => res.send('<h1> Wrong route maybe? </h1>'));
};