import yaml from 'js-yaml';
import fs from 'fs';
import format from 'date-fns/format';
import sinon from 'sinon';

import client from '../../src/feeds';
import { blog, delicious, notFoundDelicious } from '../mocks.test';

describe('Feeds', () => {
  let clock;

  before(() => {
    clock = sinon.useFakeTimers();
  });
  after(() => {
    clock.restore();
  });

  describe('Blog', () => {
    beforeEach(() => {
      blog();
    });
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

    it('builds my data structure', (done) => {
      const expected = { wordpress:
      {
        details: ['W',
          'https://www.tcias.co.uk/blog',
          6,
          'Click to view my blog',
          'icon-wordpress'],
        listItems: {
          items: [{ link: 'https://www.tcias.co.uk/blog/2015/08/07/your-organisation-should-adopt-an-open-source-model/',
            value: 'Your Organisation Should Adopt an Open Source Model',
            date: format(new Date('2015-08-07T10:25:04+00:00'), 'YYYY/MM/DD @ HH:mm') },
          { link: 'https://www.tcias.co.uk/blog/2015/06/28/why-use-node-dot-js/',
            value: 'Why Use Node.js',
            date: format(new Date('2015-06-28T14:35:22+00:00'), 'YYYY/MM/DD @ HH:mm') },
          { link: 'https://www.tcias.co.uk/blog/2015/06/07/are-you-using-docker/',
            value: 'Are You Using Docker?',
            date: format(new Date('2015-06-07T21:51:43+00:00'), 'YYYY/MM/DD @ HH:mm') },
          { link: 'https://www.tcias.co.uk/blog/2015/06/01/two-cool-use-cases-for-vagrant/',
            value: 'Two Cool Use Cases for Vagrant',
            date: format(new Date('2015-06-01T20:56:48+00:00'), 'YYYY/MM/DD @ HH:mm') },
          { link: 'https://www.tcias.co.uk/blog/2015/05/17/clojure-data-structures/',
            value: 'Clojure Data Structures',
            date: format(new Date('2015-05-17T11:15:14+00:00'), 'YYYY/MM/DD @ HH:mm') },
          { link: 'https://www.tcias.co.uk/blog/2015/05/02/exploring-the-open-closed-principle/',
            value: 'Exploring the Open Closed Principle',
            date: format(new Date('2015-05-02T15:29:33+00:00'), 'YYYY/MM/DD @ HH:mm') },
          { link: 'https://www.tcias.co.uk/blog/2015/04/23/a-quarter-of-the-way-in/',
            value: 'A Quarter of the Way In',
            date: format(new Date('2015-04-23T15:27:42+00:00'), 'YYYY/MM/DD @ HH:mm') },
          { link: 'https://www.tcias.co.uk/blog/2015/04/14/picking-a-new-language-to-learn/',
            value: 'Picking a New Language to Learn',
            date: format(new Date('2015-04-14T22:08:55+00:00'), 'YYYY/MM/DD @ HH:mm') },
          { link: 'https://www.tcias.co.uk/blog/2015/04/07/how-to-test-your-gem-against-multiple-ruby-versions-using-circle-ci/',
            value: 'How to Test Your Gem Against Multiple Ruby Versions Using Circle Ci',
            date: format(new Date('2015-04-07T21:14:24+00:00'), 'YYYY/MM/DD @ HH:mm') },
          { link: 'https://www.tcias.co.uk/blog/2015/04/07/a-couple-of-bundler-tricks/',
            value: 'A Couple of Bundler Tricks',
            date: format(new Date('2015-04-07T21:04:33+00:00'), 'YYYY/MM/DD @ HH:mm') }] } },
      };

      const doc = yaml.safeLoad(fs.readFileSync('./feed-config.yml', 'utf8'));

      client.build('wordpress', doc.wordpress)
        .then((response) => {
          expect(response).to.deep.equal(expected);
          done();
        })
        .catch((error) => {
          expect(error).to.equal(undefined);
          done();
        });
    });
  });

  describe('Delicious', () => {
    describe('not found request', () => {
      beforeEach(() => {
        notFoundDelicious();
      });
      it('returns an invalid response', (done) => {
        client.get('http://feeds.del.icio.us/v2/rss/wildcard1999')
          .then((response) => {
            expect(response).to.deep.equal([null]);
            done();
          }).catch((error) => {
            expect(error).to.equal(undefined);
            done();
          });
      });

      it('builds my data structure', (done) => {
        const expected = { delicious:
        {
          details: ['D', 'https://delicious.com/wildcard1999', 5, 'Click to view my Delicious profile', 'icon-delicious'],
          listItems: {
            items: [{ link: 'https://delicious.com/wildcard1999',
              value: 'delicious feed could not be fetched',
              date: format(new Date(), 'YYYY/MM/DD @ HH:mm') }] } },
        };

        const doc = yaml.safeLoad(fs.readFileSync('./feed-config.yml', 'utf8'));

        client.build('delicious', doc.delicious)
          .then((response) => {
            expect(response).to.deep.equal(expected);
            done();
          })
          .catch((error) => {
            expect(error).to.equal(undefined);
            done();
          });
      });
    });

    describe('valid requests', () => {
      beforeEach(() => {
        delicious();
      });
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

      it('builds my data structure', (done) => {
        const expected = { delicious:
        {
          details: ['D', 'https://delicious.com/wildcard1999', 5, 'Click to view my Delicious profile', 'icon-delicious'],
          listItems: {
            items: [{ link: 'https://shop.icio.us/sales/the-limited-edition-black-hawk-drone-hd-camera?utm_source=del.icio.us&utm_medium=referral&utm_campaign=the-limited-edition-black-hawk-drone-hd-camera',
              value: 'Sponsored: 64% off Code Black Drone with HD Camera',
              date: format(new Date('Sat, 31 Dec 2016 17:43:28 -0000'), 'YYYY/MM/DD @ HH:mm') },
            { link: 'https://www.cypress.io/',
              value: 'Cypress.io: Testing, the way it should be.',
              date: format(new Date('Thu, 27 Oct 2016 14:41:50 +0000'), 'YYYY/MM/DD @ HH:mm') },
            { link: 'https://medium.com/@ztellman/senior-engineers-reduce-risk-5ab2adc13c97#.kb5jr7kei',
              value: 'Senior Engineers Reduce Risk — Medium',
              date: format(new Date('Thu, 04 Aug 2016 20:19:23 +0000'), 'YYYY/MM/DD @ HH:mm') },
            { link: 'https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md?utm_source=hackernewsletter&utm_medium=email&utm_term=code',
              value: 'api-guidelines/Guidelines.md at master · Microsoft/api-guidelines',
              date: format(new Date('Thu, 04 Aug 2016 20:11:56 +0000'), 'YYYY/MM/DD @ HH:mm') },
            { link: 'https://github.com/nervous-systems/cljs-lambda',
              value: 'nervous-systems/cljs-lambda: Utilities around deploying Clojurescript functions to AWS Lambda',
              date: format(new Date('Sun, 26 Jun 2016 21:21:32 +0000'), 'YYYY/MM/DD @ HH:mm') }] } },
        };

        const doc = yaml.safeLoad(fs.readFileSync('./feed-config.yml', 'utf8'));

        client.build('delicious', doc.delicious)
          .then((response) => {
            expect(response).to.deep.equal(expected);
            done();
          })
          .catch((error) => {
            expect(error).to.equal(undefined);
            done();
          });
      });
    });
  });
});
