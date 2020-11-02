const supertest = require("supertest");
const server = require("../config/testServer");
const request = supertest(server);

const { connectDb, removeAllCollections } = require("../config/helpers");
const auth = require("../../controllers/auth");

const User = require("../../models/user");
const Profile = require("../../models/profile");

beforeAll(async () => {
  await connectDb();
});

afterEach(async () => {
  await removeAllCollections();
});

describe("signup", () => {
  it("Receives post request at /signup", async (done) => {
    const response = await request.post("/signup").send({
      email: "mustafa@gmail.com",
      password: "mustafa123",
      user_name: "mustafa_sandal",
    });

    expect(response.status).toBe(200);
    done();
  });
});
