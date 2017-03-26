import yaml from 'js-yaml';
import fs from 'fs';
import { github } from '../mocks.test';

import client from '../../github';

describe('Github', () => {
  beforeEach(() => {
    github();
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

  it('builds my data structure', (done) => {
    const expected = {
      details: ['H', 'https://github.com/gregstewart', 13, 'Click to view my GitHub profile', 'icon-github'],
      listItems: {
        type: 'github',
        items: [{ link: 'https://api.github.com/repos/gregstewart/Teacup-In-A-Storm',
          value: 'PushEvent gregstewart/Teacup-In-A-Storm',
          date: '2016/12/31 @ 17:49' },
        { link: 'https://api.github.com/repos/gregstewart/farseer',
          value: 'DeleteEvent gregstewart/farseer',
          date: '2016/12/31 @ 03:48' },
        { link: 'https://api.github.com/repos/gregstewart/farseer',
          value: 'CreateEvent gregstewart/farseer',
          date: '2016/12/31 @ 03:45' },
        { link: 'https://api.github.com/repos/gregstewart/hearthstone-tracker',
          value: 'CreateEvent gregstewart/hearthstone-tracker',
          date: '2016/12/31 @ 03:40' },
        { link: 'https://api.github.com/repos/gregstewart/Teacup-In-A-Storm',
          value: 'PushEvent gregstewart/Teacup-In-A-Storm',
          date: '2016/12/30 @ 22:50' }] } };

    const doc = yaml.safeLoad(fs.readFileSync('./feed-config.yml', 'utf8'));

    client.build(doc.github)
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
