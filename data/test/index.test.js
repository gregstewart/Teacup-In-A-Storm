import main from '../src/index';

import { blog, delicious, github } from './mocks.test';

describe('Index', () => {
  beforeEach(() => {
    blog();
    delicious();
    github();
  });
  describe('default', () => {
    it('returns my complete UI data structure', (done) => {
      const expected = {
        delicious: {
          details: ['D', 'https://delicious.com/wildcard1999', 5, 'Click to view my Delicious profile', 'icon-delicious'],
          listItems: {
            items: [{ link: 'https://shop.icio.us/sales/the-limited-edition-black-hawk-drone-hd-camera?utm_source=del.icio.us&utm_medium=referral&utm_campaign=the-limited-edition-black-hawk-drone-hd-camera',
              value: 'Sponsored: 64% off Code Black Drone with HD Camera',
              date: '2016/12/31 @ 17:43' },
            { link: 'https://www.cypress.io/',
              value: 'Cypress.io: Testing, the way it should be.',
              date: '2016/10/27 @ 15:41' },
            { link: 'https://medium.com/@ztellman/senior-engineers-reduce-risk-5ab2adc13c97#.kb5jr7kei',
              value: 'Senior Engineers Reduce Risk — Medium',
              date: '2016/08/04 @ 21:19' },
            { link: 'https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md?utm_source=hackernewsletter&utm_medium=email&utm_term=code',
              value: 'api-guidelines/Guidelines.md at master · Microsoft/api-guidelines',
              date: '2016/08/04 @ 21:11' },
            { link: 'https://github.com/nervous-systems/cljs-lambda',
              value: 'nervous-systems/cljs-lambda: Utilities around deploying Clojurescript functions to AWS Lambda',
              date: '2016/06/26 @ 22:21' }] } },
        github: {
          details: ['H', 'https://github.com/gregstewart', 13, 'Click to view my GitHub profile', 'icon-github'],
          listItems: {
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
              date: '2016/12/30 @ 22:50' }] } },
      };

      main()
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
