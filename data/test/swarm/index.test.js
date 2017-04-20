import yaml from 'js-yaml';
import fs from 'fs';

import { swarm, invalidSwarm } from '../mocks.test';
import client from '../../src/swarm';

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

    it('builds my data structure', (done) => {
      //dates look wrong
      const expected = { foursquare: {
        details: ['F', 'https://foursquare.com/user/13278548', 9, 'Click to view my Foursquare profile', 'icon-foursquare'],
        listItems: {
          items: [{ link: '',
            value: 'Plage des Sables-d\'Olonne',
            date: '1970/01/18 @ 03:59',
            lat: 46.49456311235442,
            lon: -1.7843691882828938 },
          { link: '',
            value: 'Le Longchamp',
            date: '1970/01/18 @ 03:59',
            lat: 46.493572,
            lon: -1.776645 },
          { link: '',
            value: 'L\'atelier De Saint Pierre',
            date: '1970/01/18 @ 03:59',
            lat: 46.492671966552734,
            lon: -1.7750288248062134 },
          { link: '',
            value: 'Plage des Sables-d\'Olonne',
            date: '1970/01/18 @ 03:58',
            lat: 46.49456311235442,
            lon: -1.7843691882828938 },
          { link: '',
            value: 'Marché Arago',
            date: '1970/01/18 @ 03:58',
            lat: 46.49457467428361,
            lon: -1.7735906201786265 },
          { link: '',
            value: 'L\'atelier De Saint Pierre',
            date: '1970/01/18 @ 03:58',
            lat: 46.492671966552734,
            lon: -1.7750288248062134 },
          { link: '',
            value: 'La Cuisine De Bertrand',
            date: '1970/01/18 @ 03:57',
            lat: 46.499155,
            lon: -1.790772 },
          { link: '',
            value: 'Plage des Sables-d\'Olonne',
            date: '1970/01/18 @ 03:57',
            lat: 46.49456311235442,
            lon: -1.7843691882828938 },
          { link: '',
            value: 'Le Longchamp',
            date: '1970/01/18 @ 03:56',
            lat: 46.493572,
            lon: -1.776645 },
          { link: '',
            value: 'L\'atelier De Saint Pierre',
            date: '1970/01/18 @ 03:56',
            lat: 46.492671966552734,
            lon: -1.7750288248062134 }] } } };
      const doc = yaml.safeLoad(fs.readFileSync('./feed-config.yml', 'utf8'));

      client.build('foursquare', doc.foursquare)
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
