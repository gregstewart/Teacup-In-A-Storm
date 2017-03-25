import { vimeo, invalidVimeo } from '../mocks.test';

import client from '../../vimeo';

describe('Vimeo', () => {
  describe('authorised request', () => {
    beforeEach(() => {
      vimeo();
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
      invalidAuth = {
        error: 'You must provide a valid authenticated access token.',
      };
      invalidVimeo(invalidAuth);
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
