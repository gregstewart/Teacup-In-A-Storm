import { github } from '../mocks';
import client from '../../github';

describe('Github', () => {
  before(() => {
    github();
  });

  it('fetches my events', (done) => {
    client.get()
      .then((response) => {
        expect(response.length).to.equal(30);
        expect(response[0].id).to.equal('5088294396');
        done();
      })
      .catch((error) => {
        expect(error).to.equal(undefined);
        done();
      });
  });
});
