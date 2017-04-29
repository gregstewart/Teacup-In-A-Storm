import format from 'date-fns/format';

import Instagram from 'node-instagram';

const get = (url) => {
  const instagram = new Instagram({
    clientId: process.env.INSTAGRAM_CLIENT_ID,
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
  });
  return instagram.get(url);
};

const formatter = item => ({
  link: item.link,
  image: item.images.standard_resolution.url,
  value: (item.caption && item.caption.text) ? item.caption.text : '',
  date: format(parseInt(item.created_time, 10) * 1000, 'YYYY/MM/DD @ HH:mm'),
});

const build = (key, config) => (
  new Promise((resolve) => {
    get('users/self/media/recent').then((response) => {
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
