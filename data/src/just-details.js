const build = (key, config) => (
  new Promise((resolve) => {
    const outcome = {};
    outcome[key] = {
      details: config.details,
    };
    return resolve(outcome);
  })
);

export default {
  build,
};
