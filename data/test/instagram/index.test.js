import { instagram } from '../mocks.test';

import client from '../../src/instagram';

describe('Instagram', () => {
  before(() => {
    instagram();
  });

  it('fetches my feed', (done) => {
    client.get('users/self/media/recent')
      .then((response) => {
        expect(response.data.length).to.equal(20);
        expect(response.data[0].link).to.equal('https://www.instagram.com/p/BOVFIBJl7P0/');
        done();
      }).catch((error) => {
        expect(error).to.equal(undefined);
        done();
      });
  });
});
