import yaml from 'js-yaml';
import fs from 'fs';
import { format } from 'date-fns';

import { twitter } from '../mocks.test';
import fakeResponse from '../fixtures/twitter';
import client from '../../src/twitter';

describe('Twitter', () => {
  beforeEach(() => {
    twitter(fakeResponse);
  });

  it('fetches my stream', (done) => {
    client.get('/statuses/user_timeline.json', { screen_name: '_greg_stewart_' })
      .then((response) => {
        expect(response.length).to.equal(fakeResponse.length);
        done();
      }).catch((error) => {
        expect(error).to.be.undefined();
        done();
      });
  });

  it('builds my data structure', (done) => {
    const expected = { twitter:
    { details: ['T', 'https://twitter.com/_greg_stewart_', 8, 'Click to view my Twitter profile', 'icon-twitter'],
      listItems: { items: [{ link: 'https://twitter.com/_greg_stewart_/status/812726496813060100',
        value: 'You know you have been playing too much Hearthstone, when... https://t.co/zdyyQLFEan',
        date: format(new Date('Sat Dec 24 18:27:51 +0000 2016'), 'YYYY/MM/DD @ HH:mm') },
      { link: 'https://twitter.com/_greg_stewart_/status/794251096827035600',
        value: 'RT @redbadgerteam: We\'re delighted to launch our new branding and phase 1 of our new site. What do you think?\n\nhttps://t.co/GjagPtOI2B\n\n#Ba…',
        date: format(new Date('Thu Nov 03 18:53:12 +0000 2016'), 'YYYY/MM/DD @ HH:mm') },
      { link: 'https://twitter.com/_greg_stewart_/status/790455379608076300',
        value: 'RT @redbadgerteam: Contractors! If you have commercial #react experience &amp; would be keen to work on a #serverless project- get in touch- jo…',
        date: format(new Date('Mon Oct 24 07:30:23 +0000 2016'), 'YYYY/MM/DD @ HH:mm') },
      { link: 'https://twitter.com/_greg_stewart_/status/774494436185239600',
        value: 'RT @redbadgerteam: Exciting news! We are # 44 in the @ST_TechTrack, out this Sunday! #TechTrack100',
        date: format(new Date('Sat Sep 10 06:27:17 +0000 2016'), 'YYYY/MM/DD @ HH:mm') }] } } };

    const doc = yaml.safeLoad(fs.readFileSync('./feed-config.yml', 'utf8'));

    client.build('twitter', doc.twitter)
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
