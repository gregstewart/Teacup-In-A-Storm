import fetch from 'node-fetch';
import formatDate from '../format-date';

const get = endpoint => (
  new Promise((resolve, reject) => {
    const options = {
      headers: {
        Accept: `application/vnd.vimeo.*+json;version=${process.env.VIMEO_API_VERSION}`,
        Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
      },
    };
    const baseURL = 'https://api.vimeo.com';
    const authenticatedEndpoint = `${baseURL}${endpoint}?page=1&per_page=10`;
    return fetch(authenticatedEndpoint, options)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        return response.json().then((json) => {
          throw json;
        });
      })
      .then(json => (
        resolve(json)
      )).catch(error => (
        reject(error)
      ));
  })
);

const formatter = item => ({
  link: item.link,
  image: item.pictures.sizes[4].link,
  value: item.name,
  date: formatDate(item.release_time),
});

const build = (key, config) => (
  new Promise((resolve) => {
    get('/me/videos').then((response) => {
      const items = response.data.slice(0, config.count).map(formatter);
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
