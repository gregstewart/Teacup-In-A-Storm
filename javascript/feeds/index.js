import fetch from 'node-fetch';
import pickup from 'pickup';

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

export default {
  get,
};
