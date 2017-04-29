import yaml from 'js-yaml';
import fs from 'fs';

import { instagram } from '../mocks.test';

import client from '../../src/instagram';

describe('Instagram', () => {
  beforeEach(() => {
    instagram();
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

  it('builds my data structure', (done) => {
    const expected = { instagram:
    {
      details: ['I', 'http://instagram.com/_greg_stewart_', 10, 'Click to view my Instagram profile', 'icon-instagram'],
      listItems: {
        items: [{ link: 'https://www.instagram.com/p/BOVFIBJl7P0/',
          image: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/15624104_355434591494413_1743839060994031616_n.jpg?ig_cache_key=MTQxMTA1NjU5OTQ3MzU2NjcwOA%3D%3D.2',
          value: 'A break from those typical grey December days',
          date: '2016/12/22 @ 18:24' },
        { link: 'https://www.instagram.com/p/BM_pYkTFcgy/',
          image: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14566614_338119023227868_7581358026154573824_n.jpg?ig_cache_key=MTM4NzAwOTIxODQwMjY5OTMxNA%3D%3D.2',
          value: 'Word search race',
          date: '2016/11/19 @ 14:06' },
        { link: 'https://www.instagram.com/p/BMtluioFbhO/',
          image: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/15057281_686875324815130_2249308560854876160_n.jpg?ig_cache_key=MTM4MTkyNjU4NjY2OTE4NTEwMg%3D%3D.2',
          value: 'Hello Alexa!',
          date: '2016/11/12 @ 13:48' },
        { link: 'https://www.instagram.com/p/BMpLajHF0mt/',
          image: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/15034978_1761637140767094_1776940777671229440_n.jpg?ig_cache_key=MTM4MDY4NDk2MzY4MzcxNTUwMQ%3D%3D.2',
          value: 'Cat in a box',
          date: '2016/11/10 @ 20:41' },
        { link: 'https://www.instagram.com/p/BMd4dlWl8s0/',
          image: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14712388_1164055633674635_6719595927956357120_n.jpg?ig_cache_key=MTM3NzUwNTM4NDYyMjE4MTE3Mg%3D%3D.2',
          value: 'Sunday morning rugby practice',
          date: '2016/11/06 @ 11:24' },
        { link: 'https://www.instagram.com/p/BMbIjnSlMul/',
          image: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14701334_671995542960909_9190984633368444928_n.jpg?ig_cache_key=MTM3NjczMTc0MjgzMzI2NTU3Mw%3D%3D.2',
          value: 'Day dreaming of waffles',
          date: '2016/11/05 @ 09:47' }] } },
    };

    const doc = yaml.safeLoad(fs.readFileSync('./feed-config.yml', 'utf8'));

    client.build('instagram', doc.instagram)
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
