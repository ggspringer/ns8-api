import * as express from "express";

import { check, validationResult } from "express-validator";

import asyncMiddleware from "../helpers/asyncMiddleware";
import EventRepository from "../repo/EventRepository";
import UserRepository from "../repo/UserRepository";

const router = express.Router();

router.get(
  "/",
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    const users = await UserRepository.getAllUsers();
    res.send(users);
  }),
);

router.post(
  "/",
  [
    check("email")
      .exists()
      .isEmail()
      .custom(async (value) => {
        const user = await UserRepository.getUserByEmail(value);

        if (user) {
          throw new Error("User already exists!");
        }
      }),
    check("password")
      .exists()
      .withMessage("Must supply a password."),
    check("phone")
      .optional()
      .matches(/^\d{3}-\d{3}-\d{4}$/)
      .withMessage("Invalid phone format."),
  ],
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    const result = UserRepository.create(
      req.body.email,
      req.body.password,
      req.body.phone,
    );

    res.status(201).send(result);
  }),
);

router.get(
  "/:id",
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    const user = await UserRepository.getUserById(Number(req.params.id));
    res.send(user);
  }),
);

router.get(
  "/:id/events",
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    const userId = Number(req.params.id);
    const events = await EventRepository.getEventsByUserId(userId);
    res.send(events);
  }),
);

router.get(
  "/:id/events/recent",
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    const userId = Number(req.params.id);
    let userEvents = await EventRepository.getEventsByUserId(userId);

    const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000;
    userEvents = userEvents.filter((event) => event.created >= yesterday);

    res.send(userEvents);
  }),
);

router.post(
  "/:id/events",
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    const { type, created } = req.body;
    const userId = Number(req.params.id);
    const event = await EventRepository.create(
      userId,
      type,
      Number(created) || new Date().getTime(),
    );
    res.status(201).send(event);
  }),
);

export default router;
