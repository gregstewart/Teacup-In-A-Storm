import { twitter } from '../mocks.test';
import fakeResponse from '../fixtures/twitter';
import client from '../../src/twitter';

describe('Twitter', () => {
  before(() => {
    twitter(fakeResponse);
  });

  it('fetches my stream', (done) => {
    client.get('/statuses/user_timeline.json', { screen_name: '_greg_stewart_' })
      .then((response) => {
        expect(response.length).to.equal(fakeResponse.length);
        done();
      }).catch((error) => {
        expect(error).to.be.undefined();
        done();
      });
  });
});
