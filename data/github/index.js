import GitHubApi from 'github';
import Promise from 'bluebird';
import format from 'date-fns/format';

const get = () => (
  new Promise((resolve, reject) => {
    const github = new GitHubApi({
      Promise,
    });

    github.authenticate({
      type: 'oauth',
      token: process.env.GITHUB_PERSONAL_TOKEN,
    });

    return github.activity.getEventsForUser({ username: 'gregstewart' })
      .then(response => (resolve(response)))
      .catch(error => (reject(error)));
  })
);
// item.payload.commits - contains an array of commit messages
const formatter = item => ({
  link: item.repo.url,
  value: `${item.type} ${item.repo.name}`,
  date: format(item.created_at, 'YYYY/MM/DD @ HH:mm'),
});

const build = config => (
  new Promise((resolve) => {
    get().then((response) => {
      const items = response.slice(0, config.count).map(formatter);
      return resolve({
        details: config.details,
        listItems: {
          type: 'github',
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
