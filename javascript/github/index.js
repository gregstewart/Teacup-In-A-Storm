import GitHubApi from 'github';
import Promise from 'bluebird';

const get = () => {
  return new Promise((resolve, reject) => {
    const github = new GitHubApi({
      Promise,
    });

    github.authenticate({
      type: 'oauth',
      token: process.env.GITHUB_PERSONAL_TOKEN,
    });

    return github.activity.getEventsForUser({ username: 'gregstewart' })
      .then((response) => {
        return resolve(response);
      }).catch((error) => {
        return reject(error);
      });
  });
};

export default {
  get,
};
