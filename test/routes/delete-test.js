const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const Item = require('../../models/item');

const {buildItemObject} = require('../test-utils');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id/delete', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('POST', () => {
    it('item is deleted from database', async () => {
      // setup
      const itemToCreate = buildItemObject();
      const itemToDelete = await seedItemToDatabase(itemToCreate);
      const itemId = itemToDelete._id;
      // exercise
      const response = await request(app)
        .post(`/items/${itemId}/delete`);
      // verify
      assert.notInclude(parseTextFromHTML(response.text, `body`), itemId);
    });
  });
});
