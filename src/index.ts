import * as bodyParser from "body-parser";
import * as express from "express";
import EventRepository from "./repo/EventRepository";
import UserRepository from "./repo/UserRepository";

const app = express();

app.use(bodyParser.json());

app.get("/events", async (req: express.Request, res: express.Response) => {
  const events = await EventRepository.getAllEvents();
  res.send(events);
});

app.get(
  "/users/:id/events",
  async (req: express.Request, res: express.Response) => {
    const { userId } = req.params;
    const events = await EventRepository.getEventsByUserId(userId);
    res.send(events);
  },
);

app.get(
  "/users/:id/events/recent",
  async (req: express.Request, res: express.Response) => {
    const { userId } = req.params;
    let userEvents = await EventRepository.getEventsByUserId(userId);

    const yesterday = ((new Date().getTime()) - (24 * 60 * 60 * 1000));
    userEvents = userEvents.filter((event) => event.utcDate >= yesterday);

    res.send(userEvents);
  },
);

app.post(
  "/users/:id/events",
  async (req: express.Request, res: express.Response) => {
    const { type, created } = req.body;
    const { userId } = req.params;

    const event = EventRepository.create(userId, type, created || new Date().getTime());
    res.status(201).send(event);
  },
);

app.get("/users", async (req: express.Request, res: express.Response) => {
  const users = await UserRepository.getAllUsers();
  res.send(users);
});

app.get("/users/:id", async (req: express.Request, res: express.Response) => {
  const user = await UserRepository.getUserById(Number(req.params.id));
  res.send(user);
});

app.post("/users", (req: express.Request, res: express.Response) => {
  const result = UserRepository.create(
    req.body.email,
    req.body.password,
    req.body.phone,
  );

  res.status(201).send(result);
});

app.listen(5000, () => {
  // tslint:disable-next-line: no-console
  console.log("server started on port 5000");
});
