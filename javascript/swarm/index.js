import fetch from 'node-fetch';

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

export default {
  get,
};
