import { NextFunction, RequestHandler, Request, Response } from "express";

export function handlePromiseErrors<
    T,
    P,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any,
    Locals extends Record<string, any> = Record<string, any>
>(requestHandler: PromiseRequestHandler<T, P, ResBody, ReqBody, ReqQuery, Locals>): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {
  return function(req, res, next) {
    requestHandler(req, res, next).catch(err => next(err));
  };
}

interface PromiseRequestHandler<
    T,
    P,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any,
    Locals extends Record<string, any> = Record<string, any>
> {
    // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2)
    (
        req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
        res: Response<ResBody, Locals>,
        next: NextFunction,
    ): Promise<T | void>;
}