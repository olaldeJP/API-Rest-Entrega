import { faker } from "@faker-js/faker";

function createProductMock() {
  return {
    _id: faker.string.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: "Random Thumbnail",
    code: faker.string.uuid(),
    stock: faker.helpers.rangeToNumber({ min: 1, max: 50 }),
  };
}

class ProductMock {
  constructor() {
    this.products = [];
  }
  async addMocksProduct() {
    this.products.push(createProductMock());
  }
  async getMocksProducts() {
    return this.products;
  }
}

export const productsMock = new ProductMock();
