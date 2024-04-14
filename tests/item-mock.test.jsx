const request = require("supertest");
const controller = require('../controllers/shoppingItemController');
const app = require('./../app');
jest.mock('../controllers/shoppingItemController', () => {
    return {
        list: jest.fn(),
        getItem: jest.fn(),
        createItem: jest.fn(),
        updateItem: jest.fn(),
        deleteItem: jest.fn()
    };
});
/*describe('Testing read operations', () => {
    test('Get list of products', async () => {

    }),
    test('Get selected product', async () => {

    })
});*/
describe('Testing creating operation', () => {
    test('Create successfull product', async () => {
        controller.createItem.mockReturnValue({
            "content": "sušenka",
            "state": "COMPLETE",
            "count": 1,
        });
        const response = await request(app).post("/shoppingitem/create").send({
            "content": "sušenka",
            "state": "COMPLETE",
            "count": 1,
        });
        expect(response.body.state).toEqual("COMPLETE");
        expect(response.body.content).toEqual("sušenka");
        expect(response.body.count).toEqual(1);
        expect(controller.createItem).toHaveBeenCalled();
    })
})
