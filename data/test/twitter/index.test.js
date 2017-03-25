import { twitter } from '../mocks';
import fakeResponse from '../fixtures/twitter';
import client from '../../twitter';

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
