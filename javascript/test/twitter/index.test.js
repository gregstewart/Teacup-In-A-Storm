import dotEnv from 'dotenv';
import nock from 'nock';

import fakeResponse from '../fixtures/twitter';
import client from '../../twitter';

describe('Twitter', () => {
  before(() => {
    nock('https://api.twitter.com')
      .get('/1.1/statuses/user_timeline.json?screen_name=_greg_stewart_')
      .reply(200, fakeResponse);
    dotEnv.config();
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
