import dotEnv from 'dotenv';
import nock from 'nock';
import fs from 'fs';

import client from '../../swarm';

describe('Swarm', () => {
  describe('authorised request', () => {
    beforeEach(() => {
      dotEnv.config();
      const swarmFeed = fs.readFileSync('./test/fixtures/swarm.json', 'utf-8');
      nock('https://api.foursquare.com')
        .get(`/v2/users/self/checkins?v=${process.env.SWARM_API_VERSION}&oauth_token=${process.env.SWARM_ACCESS_TOKEN}`)
        .reply(200, swarmFeed);
    });

    it('fetches my feed', (done) => {
      client.get('/users/self/checkins')
        .then((response) => {
          expect(response.response.checkins.items.length).to.equal(20);
          expect(response.response.checkins.items[0].id).to.equal('5867d042d25ded6f126780ca');
          done();
        }).catch((error) => {
          console.log(error);
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
        meta: {
          code: 401,
          errorType: 'invalid_auth',
          errorDetail: 'OAuth token invalid or revoked.' },
        response: {},
      };
      process.env.SWARM_ACCESS_TOKEN = 'foo';
      nock('https://api.foursquare.com')
        .get(`/v2/users/self/checkins?v=${process.env.SWARM_API_VERSION}&oauth_token=foo`)
        .reply(401, invalidAuth);
    });
    it('returns an invlaid response', (done) => {
      client.get('/users/self/checkins')
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
