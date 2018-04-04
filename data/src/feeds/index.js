import fetch from 'node-fetch';
import pickup from 'pickup';
import formatDate from '../format-date';
import fixLink from '../fix-link';

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
  { link: fixLink(item.link),
    value: item.title,
    date: formatDate(item.updated) }
);

const handleError = (key, link) => (
  [{ link,
    value: `${key} feed could not be fetched`,
    date: formatDate(new Date()),
  }]
);

const build = (key, config, logger) => (
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
