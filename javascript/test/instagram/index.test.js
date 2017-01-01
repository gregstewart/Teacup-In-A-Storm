import dotEnv from 'dotenv';
import nock from 'nock';
import fs from 'fs';

import client from '../../instagram';

describe('Instagram', () => {
  before(() => {
    dotEnv.config();
    const instagramFeed = fs.readFileSync('./test/fixtures/instagram.json', 'utf-8');

    nock('https://api.instagram.com')
      .get(`/v1/users/self/media/recent?access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`)
      .reply(200, instagramFeed);
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
