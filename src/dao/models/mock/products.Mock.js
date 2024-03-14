import { faker } from "@faker-js/faker";
export class ProductsMock {
  async createProductMock() {
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
  async createProductMockDataWithout(field) {
    const productData = {
      _id: faker.string.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      thumbnail: "Random Thumbnail",
      code: faker.string.uuid(),
      stock: faker.helpers.rangeToNumber({ min: 1, max: 50 }),
    };
    delete productData[field];
    return productData;
  }
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
