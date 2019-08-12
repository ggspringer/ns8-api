import { NextFunction } from "connect";
import * as express from "express";

export default (fn: Function) => (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
