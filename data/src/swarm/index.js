import fetch from 'node-fetch';
import formatDate from '../format-date';

const get = endpoint => (
  new Promise((resolve, reject) => {
    const baseURL = 'https://api.foursquare.com/v2';
    const authenticatedEndpoint = `${baseURL}${endpoint}?v=${process.env.SWARM_API_VERSION}&oauth_token=${process.env.SWARM_ACCESS_TOKEN}`;
    return fetch(authenticatedEndpoint)
      .then(response => (
        response.json()
      ))
      .then((json) => {
        if (json.meta.code === 200) {
          return resolve(json);
        }
        return reject(json);
      });
  })
);

const formatter = item => ({
  link: item.venue.url ? item.venue.url : '',
  value: item.venue.name,
  date: formatDate(item.createdAt),
  lat: item.venue.location.lat,
  lon: item.venue.location.lng,
});

const handleError = (key, link) => (
  [{ link,
    value: `${key} feed could not be fetched`,
    date: formatDate(new Date()),
  }]
);

const build = (key, config, logger) => (
  new Promise((resolve) => {
    get('/users/self/checkins')
      .then((response) => {
        const items = response.response.checkins.items.slice(0, config.count).map(formatter);
        const outcome = {};
        outcome[key] = {
          details: config.details,
          listItems: {
            items,
          },
        };
        return resolve(outcome);
      }).catch((error) => {
        logger.error(error);
        const outcome = {};
        outcome[key] = {
          details: config.details,
          listItems: {
            items: handleError(key, config.details[1]),
          },
        };
        return resolve(outcome);
      });
  })
);
export default {
  get,
  build,
};
