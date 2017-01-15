import dotEnv from 'dotenv';
import nock from 'nock';
import fs from 'fs';

import client from '../../vimeo';

describe('Vimeo', () => {
  describe('authorised request', () => {
    beforeEach(() => {
      dotEnv.config();
      const feed = fs.readFileSync('./test/fixtures/vimeo.json', 'utf-8');
      nock('https://api.vimeo.com')
        .get('/me/videos?page=1&per_page=10')
        .reply(200, feed);
    });

    it('fetches my feed', (done) => {
      client.get('/me/videos')
        .then((response) => {
          expect(response.data.length).to.equal(10);
          expect(response.data[0].uri).to.equal('/videos/93167466');
          done();
        }).catch((error) => {
          expect(error).to.equal(undefined);
          done();
        });
    });
  });

  describe('unauthorised request', () => {
    let invalidAuth;
    beforeEach(() => {
      dotEnv.config();
      invalidAuth = {
        error: 'You must provide a valid authenticated access token.',
      };
      process.env.VIMEO_ACCESS_TOKEN = 'foo';
      nock('https://api.vimeo.com')
        .get('/me/videos?page=1&per_page=10')
        .reply(401, invalidAuth);
    });
    it('returns an invalid response', (done) => {
      client.get('/me/videos')
        .then((response) => {
          expect(response).to.equal(undefined);
          done();
        }).catch((error) => {
          expect(error).to.deep.equal(invalidAuth);
          done();
        });
    });
  });
});
