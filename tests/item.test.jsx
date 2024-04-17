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
describe("Getting product", () => {
    test("Return list of products", async () => {
        for(let i = 0; i < faker.number.int({min: 2, max: 20}); i++) {
            const product = generateRandomItem()
            await setItem(product);
        }
        const response = await request(app).get(`/shoppingitem/list`)
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body.message).toBeUndefined();
    });
    test("Return list without products", async () => {
        const response = await request(app).get(`/shoppingitem/list`)
        expect(response.status).toBe(404);
        console.log(response.body.message)
        expect(response.body.message).not.toBeUndefined();
    });

    test("Return product", async () => {
        const product = generateRandomItem()
        const item = await setItem(product);
        const response = await request(app).get(`/shoppingitem/list/${item.slug}`)
        expect(response.status).toBe(200);

        expect(response.body.state).toEqual(item.state);
        expect(response.body.content).toEqual(item.content);
        expect(response.body.count).toEqual(item.count);
        expect(response.body.slug).toEqual(item.slug);

    });
    test("Return product not found", async () => {
        const response = await request(app).get(`/shoppingitem/list/${faker.lorem.word()}`)
        expect(response.status).toBe(404);
        expect(response.body.message).not.toBeUndefined();
    });
})
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
        expect(response.body.message).not.toBeUndefined();
    });
    test("Creating product with wrong state", async () => {
        const product = generateRandomItem()
        product.state = faker.lorem.word()
        const response = await request(app).post("/shoppingitem/create").send(product);
        expect(response.status).toBe(400);
        expect(response.body.message).not.toBeUndefined();

        const item = await getItem(response.body.slug)
        expect(item).toBeNull();
    });
    test("Creating product with negative count", async () => {
        const product = generateRandomItem()
        product.count = faker.number.int({max: 0});
        const response = await request(app).post("/shoppingitem/create").send(product);
        expect(response.status).toBe(400);
        expect(response.body.message).not.toBeUndefined();

        const item = await getItem(response.body.slug)
        expect(item).toBeNull();
    });
});
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
    test("Updating non existed product", async () => {
        const product = generateRandomItem()
        const response = await request(app).put(`/shoppingitem/update/${faker.lorem.slug()}`).send(product);

        expect(response.status).toBe(404);
        expect(response.body.message).not.toBeUndefined();
    });
});
describe("Deleting product", () => {
    test("Deleting product successfully", async() =>{
        const product = generateRandomItem()
        const item = await setItem(product);
        const response = await request(app).delete(`/shoppingitem/delete/${item.slug}`);
        expect(response.status).toBe(200);

        const newItem = await getItem(item.slug)
        expect(newItem).toBeNull();
        expect(response.body.message).not.toBeUndefined();
    });
    test("Deleteting non-existing product", async() =>{
        const response = await request(app).delete(`/shoppingitem/delete/${faker.lorem.slug()}`);
        expect(response.status).toBe(404);
        expect(response.body.message).not.toBeUndefined();
    })
})

