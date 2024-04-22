const Item = require('../models/item-model')
const { faker } = require('@faker-js/faker')
const states = require('./../enum/stateEnum')

const getItem = async (par) => {
  return Item.findOne({ slug: par })
}
const setItem = async (item) => {
  return await Item.create(item)
}
const generateRandomItem = () => {
  const product = {
    count: faker.number.int({ min: 1 }),
    state: faker.helpers.arrayElement(Object.values(states)),
    content: faker.lorem.word(),
  }
  return product
}
module.exports = { getItem, setItem, generateRandomItem }
