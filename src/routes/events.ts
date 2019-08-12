import * as express from "express";

import asyncMiddleware from "../helpers/asyncMiddleware";
import EventRepository from "../repo/EventRepository";

const router = express.Router();

router.get(
  "/",
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    const events = await EventRepository.getAllEvents();
    res.send(events);
  }),
);

export default router;
