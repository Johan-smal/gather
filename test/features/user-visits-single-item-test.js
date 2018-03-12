const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits the single item', () => {
  describe('posts a new item', () => {
    it('can then view the description', () => {
      /// setup
      const itemToCreate = buildItemObject();
      browser.url('/items/create');

      /// exercise
      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
      browser.click('#submit-button');
      // click the created item
      browser.click('.item-card a');

      /// verify
      assert.include(browser.getHTML('body'), itemToCreate.description);
      assert.include(browser.getHTML('body'), itemToCreate.title);
      assert.include(browser.getHTML('body'), itemToCreate.imageUrl);
    });
  });
});
