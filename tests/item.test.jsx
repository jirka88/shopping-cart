const mongoose = require("mongoose");
const {connectDB, dropDB, dropCollections} = require("./../database/setuptestdb");
const request = require("supertest");
const app = require("./../app");
const Item = require("./../models/item-model");
const {getItem} = require("../trait/test-trait");

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
            const product = {
                count: 5,
                state: 'COMPLETE',
                content: 'Rohlík'
            };
            const response = await request(app).post("/shoppingitem/create").send(product);
            expect(response.status).toBe(200);

            const item = await getItem('rohlik')
            expect(item).not.toBeNull();

            expect(item).toHaveProperty("state", 'COMPLETE');
            expect(item).toHaveProperty("content", 'Rohlík');
            expect(item).toHaveProperty("slug", 'rohlik');
            expect(item).toHaveProperty("count", 5);

        },
        test("Creating product without content", async () => {
            const product = {
                count: 5,
                state: 'COMPLETE',
                content: ''
            };
            const response = await request(app).post("/shoppingitem/create").send(product);
            expect(response.status).toBe(400);
        }),
        test("Creating product with wrong state", async () => {
            const product = {
                count: 5,
                state: 'COMPLETED',
                content: 'rohlik'
            };
            const response = await request(app).post("/shoppingitem/create").send(product);
            expect(response.status).toBe(400);

            const item = await getItem('rohlik')
            expect(item).toBeNull();
        }),
        test("Creating product with negative count", async () => {
            const product = {
                count: -5,
                state: 'COMPLETE',
                content: 'rohlík'
            };
            const response = await request(app).post("/shoppingitem/create").send(product);
            expect(response.status).toBe(400);

            const item = await getItem('rohlik')
            expect(item).toBeNull();
        })
)
})

