import fetch from 'node-fetch';

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

export default {
  get,
};
