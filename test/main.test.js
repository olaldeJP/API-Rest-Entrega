import { usersService } from "../src/services/users.service.js";
import * as chai from "chai";
import { Server } from "../app/app.js";
import { URL_MONGO_LOCAL } from "../src/config/config.js";
import { UserMock } from "../src/dao/models/mock/user.Mock.js";
import { ProductsMock } from "../src/dao/models/mock/products.Mock.js";
import { request } from "express";
import supertest from "supertest";

const TEST_PORT = 9090;
const baseURL = `http://localhost:${TEST_PORT}`;
const requester = supertest(baseURL);
const userMock = new UserMock();
const productMock = new ProductsMock();
let token = "";
chai.should();
describe("Api Rest Test", function () {
  //setup(preparacion)
  before(async function () {
    this.serverTest = new Server(URL_MONGO_LOCAL);
    await this.serverTest.connect(TEST_PORT);
  });

  //asserion(validacion)
  after(async function () {
    await this.server.disconnect();
    await disconnectDb();
  });
});
describe("Sessions Routers", function () {
  describe("PORT api/users/", function () {
    it("Registra al usuario y devuelve los datos con codigo 201", async function () {
      let user = await userMock.createUserMock();
      user["password"] = "randomPassword";
      requester.post("/api/users").send(user).expect(201);
    });

    it("Se Envia Sin Email - deberia devolver codigo de estado 400", async function () {
      let users = await userMock.createMockUserDataWithout("email");
      requester.post("/api/users").send(users).expect(400);
    });
    it("Se Envia  Sin Primer Nombre - deberia devolver codigo de estado 400", async function () {
      let users = await userMock.createMockUserDataWithout("first_name");
      requester.post("/api/users").send(users).expect(400);
    });

    it("", async function () {
      let users = await userMock.createMockUserDataWithout("first_name");
      requester.post("/api/users").send(users).expect(400);
    });
  });
  describe("PORT api/sessions/loginPassport", function () {
    it("Loggin ", function () {
      requester
        .post("/api/sessions/loginPassport") // Ruta de tu endpoint de login
        .send({ email: "test", password: "test" }) // Datos de autenticación
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) {
            console.error("Error al hacer login:", err);
            return;
          }
          // Guardar el token obtenido en una variable para usarlo más tarde
          token = res.body.token;
        });
    });
  });
});

describe("Products Routers", async function () {
  describe("PORT api/products", function () {
    it("Registra el producto y devuelve los datos con codigo 201", async function () {
      let product = await productMock.createProductMock();
      requester.post("/").send(product).expect(201);
    });
    it("Se envia sin codigo - deberia devolver codigo de estado 400", async function () {
      let products = await productMock.createProductMockDataWithout("code");
      requester.post("/").send(products).expect(400);
    });
    it("Se envia  sin precio - deberia devolver codigo de estado 400", async function () {
      let products = await productMock.createProductMockDataWithout("price");
      requester.post("/").send(products).expect(400);
    });
  });
  describe("GET api/products/", function () {
    it("Muestra todos los productos - devuelve codigo de estado 200", async function () {
      requester.get("/").expect(200);
    });
  });
});

describe("Cart Routers", async function () {
  describe("GET api/carts/", function () {
    it("/", async function () {});
  });
  describe("POST api/carts", function () {
    it("/:id", async function () {});
  });
});
