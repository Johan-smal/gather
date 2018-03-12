const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');

const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id/update', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('item to updates title, description, and imageurl are in the returned HTML', async () => {
      // setup
      const itemToSeed = await seedItemToDatabase();
      const itemId = itemToSeed._id;
      // exercise
      const response = await request(app)
        .get(`/items/${itemId}/update`);
      // verify
      const titleInput = jsdom(response.text).querySelector('#title-input');
      const imageUrlInput = jsdom(response.text).querySelector('#imageUrl-input');

      assert.include(titleInput.value, itemToSeed.title);
      assert.include(imageUrlInput.value, itemToSeed.imageUrl);
      assert.include(parseTextFromHTML(response.text, 'textarea#description-input'), itemToSeed.description);
    });
  });
  describe('POST', () => {
    it('item update successfully', async () => {
      // setup
      const itemToSeed = await seedItemToDatabase();
      const itemId = itemToSeed._id;

      const title = 'update-title';
      const description = 'the description for my update test';
      const imageUrl = 'testing.img';

      // exercise
      const response = await request(app)
        .post(`/items/${itemId}/update`)
        .type('form')
        .send({title, description, imageUrl});

      const updatedItem = await Item.findOne( { _id: itemId } );

      // verify
      assert.equal(updatedItem.title, title);
    });
  });
});
