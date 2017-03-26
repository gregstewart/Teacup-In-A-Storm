import yaml from 'js-yaml';
import fs from 'fs';
import feeds from './feeds';
import github from './github';

export default () => {
  const doc = yaml.safeLoad(fs.readFileSync('./feed-config.yml', 'utf8'));
  const promiseArray = [];
  Object.keys(doc).forEach((key) => {
    switch (key) {
      case 'delicious':
        promiseArray.push(feeds.build(key, doc[key]));
        break;
      case 'github':
        promiseArray.push(github.build(key, doc[key]));
        break;
      default:
        // not sure how to handle this just yet
    }
  });
  return Promise.all(promiseArray).then(values => (
    values.reduce((acc, val) => (
      Object.assign(acc, val)
    ), {})
  ));
};
