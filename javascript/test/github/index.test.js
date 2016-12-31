import dotEnv from 'dotenv';
import nock from 'nock';
import fs from 'fs';

import client from '../../github';

describe('Github', () => {
  before(() => {
    const gitHubResponse = JSON.parse(fs.readFileSync('./test/fixtures/github.json', 'utf-8'));
    nock('https://api.github.com/')
      .get('/users/gregstewart/events?access_token=9adaf8a500696ccf0f0c7ed7c3701b9ea5c1ad28')
      .reply(200, gitHubResponse);
    dotEnv.config();
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
