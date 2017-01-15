import dotEnv from 'dotenv';
import nock from 'nock';
import fs from 'fs';

import client from '../../github';

describe('Github', () => {
  before(() => {
    dotEnv.config();
    const gitHubResponse = JSON.parse(fs.readFileSync('./test/fixtures/github.json', 'utf-8'));
    nock('https://api.github.com/')
      .get(`/users/gregstewart/events?access_token=${process.env.GITHUB_PERSONAL_TOKEN}`)
      .reply(200, gitHubResponse);
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
