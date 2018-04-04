import Twitter from 'twitter';
import formatDate from '../format-date';

const get = (url, base) => {
  const twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });
  return twitter.get(url, base);
};

const formatter = item => ({
  link: `https://twitter.com/_greg_stewart_/status/${item.id}`,
  value: item.text,
  date: formatDate(item.created_at),
});

const build = (key, config, logger) => (
  new Promise((resolve, reject) => {
    get('/statuses/user_timeline.json', { screen_name: '_greg_stewart_' })
      .then((response) => {
        const items = response.slice(0, config.count).map(formatter);
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
        reject(error);
      });
  })
);

export default {
  get,
  build,
};
