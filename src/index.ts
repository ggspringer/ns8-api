import * as bodyParser from "body-parser";
import * as express from "express";
import eventRoutes from "./routes/events";

import { NextFunction } from "connect";

import userRoutes from "./routes/users";

const app = express();

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/events", eventRoutes);

app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction,
  ) => {
    res.status(500).send(error.message);
  },
);

export default app;
