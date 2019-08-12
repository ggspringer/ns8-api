import * as request from "supertest";

import app from "../../index";

describe("Test /users endpoint", () => {
  test("GET /users 200", async (done) => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    done();
  });

  test("GET /users/0 should return a user", () => {
    return request(app)
      .post("/users")
      .send({
        email: "test1@ns8.com",
        password: "passwordIsPizza",
      })
      .expect(201)
      .then((response: request.Response) => {
        expect(response.body.id).toEqual(0);
        expect(response.body.email).toEqual("test1@ns8.com");
      });
  });
});
