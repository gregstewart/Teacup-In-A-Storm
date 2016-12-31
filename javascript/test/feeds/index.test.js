import fs from 'fs';
import nock from 'nock';

import client from '../../feeds';

describe('Feeds', () => {
  before(() => {
    const feed = fs.readFileSync('./test/fixtures/atom.xml', 'utf-8');
    nock('https://www.tcias.co.uk')
      .get('/blog/atom.xml')
      .reply(200, feed);
  });
  describe('Blog', () => {
    it('throws an exception if the url is missing', (done) => {
      client.get()
      .then((response) => {
        expect(response).to.equal(undefined);
        done();
      })
      .catch((error) => {
        expect(error).to.equal('Missing a URL!');
        done();
      });
    });

    it('fetches a feed', (done) => {
      const url = 'https://www.tcias.co.uk/blog/atom.xml';
      client.get(url)
      .then((response) => {
        expect(response[0]).to.deep.equal({ id: 'www.tcias.co.uk/blog/2015/08/07/your-organisation-should-adopt-an-open-source-model',
          link: 'www.tcias.co.uk/blog/2015/08/07/your-organisation-should-adopt-an-open-source-model/',
          title: 'Your Organisation Should Adopt an Open Source Model',
          updated: '2015-08-07T10:25:04+00:00' });
        done();
      })
      .catch((error) => {
        expect(error).to.equal(undefined);
        done();
      });
    });
  });
});
