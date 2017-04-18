import main from '../src/index';

import { blog, delicious, github } from './mocks.test';

describe('Index', () => {
  beforeEach(() => {
    blog();
    delicious();
    github();
  });
  describe('default', () => {
    it('returns my complete UI data structure', (done) => {
      main()
        .then((response) => {
          expect(response.github).to.have.property('details');
          expect(response.github).to.have.property('listItems');
          expect(response.delicious).to.have.property('details');
          expect(response.delicious).to.have.property('listItems');
          expect(response.wordpress).to.have.property('details');
          expect(response.wordpress).to.have.property('listItems');
          expect(response['linked-in']).to.have.property('details');
          expect(response['linked-in']).not.to.have.property('listItems');
          expect(response['last-fm']).to.have.property('details');
          expect(response['last-fm']).not.to.have.property('listItems');
          expect(response.flickr).to.have.property('details');
          expect(response.flickr).not.to.have.property('listItems');
          expect(response.stackoverflow).to.have.property('details');
          expect(response.stackoverflow).not.to.have.property('listItems');
          expect(response['google-plus']).to.have.property('details');
          expect(response['google-plus']).not.to.have.property('listItems');
          expect(response.stackoverflow).to.have.property('details');
          expect(response.stackoverflow).not.to.have.property('listItems');
          done();
        })
        .catch((error) => {
          console.log(error);
          expect(error).to.equal(undefined);
          done();
        });
    });
  });
});
