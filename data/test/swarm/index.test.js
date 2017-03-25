import { swarm, invalidSwarm } from '../mocks.test';
import client from '../../swarm';

describe('Swarm', () => {
  describe('authorised request', () => {
    beforeEach(() => {
      swarm();
    });

    it('fetches my feed', (done) => {
      client.get('/users/self/checkins')
        .then((response) => {
          expect(response.response.checkins.items.length).to.equal(20);
          expect(response.response.checkins.items[0].id).to.equal('5867d042d25ded6f126780ca');
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
      invalidAuth = {
        meta: {
          code: 401,
          errorType: 'invalid_auth',
          errorDetail: 'OAuth token invalid or revoked.' },
        response: {},
      };
      invalidSwarm(invalidAuth);
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
