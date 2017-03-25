import client from '../../feeds';
import { blog, delicious } from '../mocks';

describe('Feeds', () => {
  before(() => {
    blog();
    delicious();
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

  describe('Delicious', () => {
    it('fetches a feed', (done) => {
      client.get('http://feeds.del.icio.us/v2/rss/wildcard1999')
      .then((response) => {
        expect(response[0]).to.deep.equal({ id: 'https://shop.icio.us/sales/the-limited-edition-black-hawk-drone-hd-camera?utm_source=del.icio.us&utm_medium=referral&utm_campaign=the-limited-edition-black-hawk-drone-hd-camera',
          link: 'https://shop.icio.us/sales/the-limited-edition-black-hawk-drone-hd-camera?utm_source=del.icio.us&utm_medium=referral&utm_campaign=the-limited-edition-black-hawk-drone-hd-camera',
          summary: 'Our #1 Best-Selling Drone--Meet the Dark Night of the Sky!',
          title: 'Sponsored: 64% off Code Black Drone with HD Camera',
          updated: 'Sat, 31 Dec 2016 17:43:28 -0000' });
        done();
      })
      .catch((error) => {
        expect(error).to.equal(undefined);
        done();
      });
    });
  });
});
