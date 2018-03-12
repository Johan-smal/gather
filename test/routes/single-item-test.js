const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('created items title and description are in the returned HTML', async () => {
      // setup
      const itemToSeed = await seedItemToDatabase();
      const itemId = itemToSeed._id;

      // exercise
      const response = await request(app)
        .get(`/items/${itemId}`);
        
      // verify
      assert.include(parseTextFromHTML(response.text, '#item-title'), itemToSeed.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'), itemToSeed.description);
    });
  });
});
