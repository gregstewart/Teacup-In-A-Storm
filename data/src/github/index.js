import GitHubApi from 'github';
import Promise from 'bluebird';
import formatDate from '../format-date';

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
  date: formatDate(item.created_at),
});

const build = (key, config) => (
  new Promise((resolve, reject) => {
    get().then((response) => {
      const items = response.slice(0, config.count).map(formatter);
      const outcome = {};
      outcome[key] = {
        details: config.details,
        listItems: {
          items,
        },
      };
      return resolve(outcome);
    }).catch((error) => { reject(error); });
  })
);

export default {
  get,
  build,
};
