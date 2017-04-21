import Twitter from 'twitter';
import format from 'date-fns/format';

const get = (url, base) => {
  const twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  });
  return twitter.get(url, base);
};

const formatter = item => ({
  link: `https://twitter.com/_greg_stewart_/status/${item.id}`,
  value: item.text,
  date: format(item.created_at, 'YYYY/MM/DD @ HH:mm'),
});

const build = (key, config) => (
  new Promise((resolve) => {
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
      });
  })
);

export default {
  get,
  build,
};
