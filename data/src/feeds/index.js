import fetch from 'node-fetch';
import pickup from 'pickup';
import format from 'date-fns/format';

const get = url => (
  new Promise((resolve, reject) => {
    if (!url) {
      return reject('Missing a URL!');
    }

    const items = [];
    const parser = pickup({ objectMode: true });
    parser.on('readable', () => {
      do {
        items.push(JSON.parse(JSON.stringify(parser.read())));
      } while (parser.read());
    });

    parser.on('error', error => (
      reject(error)
    ));

    parser.on('finish', () => (
      resolve(items)
    ));

    return fetch(url)
      .then((response) => {
        response.body.pipe(parser);
        response.body.on('end', () => {
          parser.end();
        });
      })
      .catch(error => (
        reject(error)
      ));
  })
);

const formatter = item => (
  { link: item.link,
    value: item.title,
    date: format(new Date(item.updated), 'YYYY/MM/DD @ HH:mm') }
);

const handleError = (key, link) => (
  [{ link,
    value: `${key} feed could not be fetched`,
    date: format(new Date(), 'YYYY/MM/DD @ HH:mm'),
  }]
);

const build = (key, config) => (
  new Promise((resolve) => {
    get(config.url)
    .then((response) => {
      let items;
      if (response[0] === null) {
        items = handleError(key, config.details[1]);
      } else {
        items = response.slice(0, config.count).map(formatter);
      }

      const outcome = {};
      outcome[key] = {
        details: config.details,
        listItems: {
          items,
        },
      };
      return resolve(outcome);
    }).catch(() => {
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
