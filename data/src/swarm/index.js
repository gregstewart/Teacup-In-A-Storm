import fetch from 'node-fetch';
import format from 'date-fns/format';

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
  date: format(item.createdAt, 'YYYY/MM/DD @ HH:mm'),
  lat: item.venue.location.lat,
  lon: item.venue.location.lng,
});

const build = (key, config) => (
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
      });
  })
);
export default {
  get,
  build,
};
