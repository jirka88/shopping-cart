const {connectDB, dropDB, dropCollections} = require("./../database/setuptestdb")
const request = require("supertest");
const app = require("./../app");
const {getItem, setItem, generateRandomItem} = require("../trait/test-trait");
const {faker} = require('@faker-js/faker');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await dropDB();
});

afterEach(async () => {
    await dropCollections();
});

describe("Creating product", () => {
    test("Should be able to create a product", async () => {
        const product = generateRandomItem()
        const response = await request(app).post("/shoppingitem/create").send(product);
        expect(response.status).toBe(200);

        const item = await getItem(response.body.slug)
        expect(item).not.toBeNull();

        expect(item).toHaveProperty("state", product.state);
        expect(item).toHaveProperty("content", product.content);
        expect(item).toHaveProperty("count", product.count);

    });
    test("Creating product without content", async () => {
        const product = generateRandomItem()
        product.content = '';
        const response = await request(app).post("/shoppingitem/create").send(product);
        expect(response.status).toBe(400);
    });
    test("Creating product with wrong state", async () => {
        const product = generateRandomItem()
        product.state = faker.lorem.word()
        const response = await request(app).post("/shoppingitem/create").send(product);
        expect(response.status).toBe(400);

        const item = await getItem(response.body.slug)
        expect(item).toBeNull();
    });
    test("Creating product with negative count", async () => {
        const product = generateRandomItem()
        product.count = faker.number.int({max: 0});
        const response = await request(app).post("/shoppingitem/create").send(product);
        expect(response.status).toBe(400);

        const item = await getItem(response.body.slug)
        expect(item).toBeNull();
    });
})
describe("Updating product", () => {
    test("Updating product", async () => {
        const product = generateRandomItem()
        const item = await setItem(product);

        const newProduct = generateRandomItem()
        const response = await request(app).put(`/shoppingitem/update/${item.slug}`).send(newProduct);

        expect(response.status).toBe(200);

        const newItem = await getItem(response.body.slug)
        expect(newItem).not.toBeNull();

    });
    test("Updating product with wrong state", async () => {
        const product = generateRandomItem()
        const item = await setItem(product);

        const newProduct = generateRandomItem()
        newProduct.state = faker.lorem.word()
        const response = await request(app).put(`/shoppingitem/update/${item.slug}`).send(newProduct);

        expect(response.status).toBe(400);

        const newItem = await getItem(response.body.slug)
        expect(newItem).toBeNull();
    });
    test("Updating product with wrong count", async () => {
        const product = generateRandomItem()
        const item = await setItem(product);

        const newProduct = generateRandomItem()
        newProduct.count = faker.number.int({max: 0});
        const response = await request(app).put(`/shoppingitem/update/${item.slug}`).send(newProduct);

        expect(response.status).toBe(400);

        const newItem = await getItem(response.body.slug)
        expect(newItem).toBeNull();
    });
    test("Updating product without content", async () => {
        const product = generateRandomItem()
        const item = await setItem(product);

        const newProduct = generateRandomItem()
        newProduct.content = ''
        const response = await request(app).put(`/shoppingitem/update/${item.slug}`).send(newProduct);

        expect(response.status).toBe(400);

        const newItem = await getItem(response.body.slug)
        expect(newItem).toBeNull();

    });
});

