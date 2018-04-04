import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import winston from 'winston';
import winstonLoggly from 'winston-loggly-bulk';/* eslint no-unused-vars: 0 */
import dotEnv from 'dotenv';
import isCI from 'is-ci';

import feeds from './feeds';
import github from './github';
import vimeo from './vimeo';
import twitter from './twitter';
import swarm from './swarm';
import instagram from './instagram';
import justDetails from './just-details';

if (!isCI) {
  dotEnv.config();
}

export default () => {
  winston.add(winston.transports.Loggly, {
    token: process.env.LOGGLY_TOKEN,
    subdomain: 'tcias',
    tags: ['Winston-NodeJS'],
    json: true,
  });

  const doc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../feed-config.yml'), 'utf8'));
  const promiseArray = [];
  Object.keys(doc).forEach((key) => {
    switch (key) {
      case 'delicious':
        promiseArray.push(feeds.build(key, doc[key], winston));
        break;
      case 'wordpress':
        promiseArray.push(feeds.build(key, doc[key], winston));
        break;
      case 'github':
        promiseArray.push(github.build(key, doc[key], winston));
        break;
      case 'vimeo':
        promiseArray.push(vimeo.build(key, doc[key], winston));
        break;
      case 'twitter':
        promiseArray.push(twitter.build(key, doc[key], winston));
        break;
      case 'foursquare':
        promiseArray.push(swarm.build(key, doc[key], winston));
        break;
      case 'instagram':
        promiseArray.push(instagram.build(key, doc[key], winston));
        break;
      default:
        promiseArray.push(justDetails.build(key, doc[key], winston));
    }
  });
  // TODO: if a promise fails, they all get rejected, this is not what we want
  return Promise.all(promiseArray)
    .then(values => (
      values.reduce((object, item) => (
        Object.assign(object, item)
      ), {})
    ))
    .catch((error) => {
      winston.error(error);
    });
};
