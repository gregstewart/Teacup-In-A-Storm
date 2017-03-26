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

const build = config => (
  new Promise((resolve) => {
    get(config.url).then((response) => {
      const items = response.slice(0, config.count).map(formatter);
      return resolve({
        details: config.details,
        listItems: {
          type: 'delicious',
          items,
        },
      });
    });
  })

);

export default {
  get,
  build,
};
