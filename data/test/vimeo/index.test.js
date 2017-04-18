import yaml from 'js-yaml';
import fs from 'fs';

import { vimeo, invalidVimeo } from '../mocks.test';

import client from '../../src/vimeo';

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

    it('builds my data structure', (done) => {
      const expected = { vimeo:
      {
        details: ['V', 'https://vimeo.com/user2724002/videos', 7, 'Click to view my Vimeo profile', 'icon-vimeo-sign'],
        listItems: {
          items: [{ link: 'https://vimeo.com/93167466',
            value: 'Portland vs Houston - drummers',
            date: '2014/04/28 @ 18:10' },
          { link: 'https://vimeo.com/93167206',
            value: 'Portland vs Houston - opening',
            date: '2014/04/28 @ 18:08' }] } },
      };

      const doc = yaml.safeLoad(fs.readFileSync('./feed-config.yml', 'utf8'));

      client.build('vimeo', doc.vimeo)
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
