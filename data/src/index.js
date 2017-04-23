import yaml from 'js-yaml';
import fs from 'fs';
import feeds from './feeds';
import github from './github';
import vimeo from './vimeo';
import twitter from './twitter';
import swarm from './swarm';
import instagram from './instagram';
import justDetails from './just-details';

export default () => {
  const doc = yaml.safeLoad(fs.readFileSync('./feed-config.yml', 'utf8'));
  const promiseArray = [];
  Object.keys(doc).forEach((key) => {
    switch (key) {
      case 'delicious':
        promiseArray.push(feeds.build(key, doc[key]));
        break;
      case 'wordpress':
        promiseArray.push(feeds.build(key, doc[key]));
        break;
      case 'github':
        promiseArray.push(github.build(key, doc[key]));
        break;
      case 'vimeo':
        promiseArray.push(vimeo.build(key, doc[key]));
        break;
      case 'twitter':
        promiseArray.push(twitter.build(key, doc[key]));
        break;
      case 'foursquare':
        promiseArray.push(swarm.build(key, doc[key]));
        break;
      case 'instagram':
        promiseArray.push(instagram.build(key, doc[key]));
        break;
      default:
        promiseArray.push(justDetails.build(key, doc[key]));
    }
  });
  // TODO: if a promise fails, they all get rejected, this is not what we want
  return Promise.all(promiseArray)
    .then(values => (
      values.reduce((object, item) => (
        Object.assign(object, item)
      ), {})
    ))
    .catch(error => error);
};
