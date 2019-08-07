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

app.post(
  "/users/:id/events",
  async (req: express.Request, res: express.Response) => {
    const { type } = req.body;
    const { userId } = req.params;

    const event = EventRepository.create(userId, type, new Date());
    res.send(event);
  },
);

app.get("/users", async (req: express.Request, res: express.Response) => {
  const repo = new UserRepository();
  const users = await repo.getAllUsers();

  res.send(users);
});

app.get("/users/:id", async (req: express.Request, res: express.Response) => {
  const repo = new UserRepository();
  const user = await repo.getUserById(Number(req.params.id));

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
