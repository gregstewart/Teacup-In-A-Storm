import yaml from 'js-yaml';
import fs from 'fs';

import client from '../src/just-details';

describe('Just details', () => {
  it('returns details only for given a simple configuration item', (done) => {
    const doc = yaml.safeLoad(fs.readFileSync('./feed-config.yml', 'utf8'));
    const expected = { 'linked-in':
    {
      details: ['L', 'http://www.linkedin.com/in/gregstewart', 3, 'Click to view my LinkedIn profile', 'icon-linkedin-sign'],
    } };

    client.build('linked-in', doc['linked-in']).then((response) => {
      expect(expected).to.deep.equal(response);
      done();
    });
  });
});
