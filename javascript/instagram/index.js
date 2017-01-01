import Instagram from 'node-instagram';

const get = (url) => {
  const instagram = new Instagram({
    clientId: process.env.INSTAGRAM_CLIENT_ID,
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
  });
  return instagram.get(url);
};

export default {
  get,
};
