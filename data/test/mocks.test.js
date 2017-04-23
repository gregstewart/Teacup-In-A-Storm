import dotEnv from 'dotenv';
import fs from 'fs';
import nock from 'nock';

export function blog() {
  const blogFeed = fs.readFileSync('./test/fixtures/atom.xml', 'utf-8');
  return nock('https://www.tcias.co.uk')
    .get('/blog/atom.xml')
    .reply(200, blogFeed);
}

export function delicious() {
  const deliciousFeed = fs.readFileSync('./test/fixtures/delicious.txt', 'utf-8');
  return nock('http://feeds.del.icio.us')
    .get('/v2/rss/wildcard1999')
    .reply(200, deliciousFeed);
}

export function notFoundDelicious() {
  return nock('http://feeds.del.icio.us')
    .get('/v2/rss/wildcard1999')
    .reply(404);
}

export function github() {
  dotEnv.config();
  const gitHubResponse = JSON.parse(fs.readFileSync('./test/fixtures/github.json', 'utf-8'));
  return nock('https://api.github.com/')
    .get(`/users/gregstewart/events?access_token=${process.env.GITHUB_PERSONAL_TOKEN}`)
    .reply(200, gitHubResponse);
}

export function swarm() {
  dotEnv.config();
  const swarmFeed = fs.readFileSync('./test/fixtures/swarm.json', 'utf-8');
  return nock('https://api.foursquare.com')
    .get(`/v2/users/self/checkins?v=${process.env.SWARM_API_VERSION}&oauth_token=${process.env.SWARM_ACCESS_TOKEN}`)
    .reply(200, swarmFeed);
}

export function invalidSwarm(invalidAuth) {
  dotEnv.config();
  process.env.SWARM_ACCESS_TOKEN = 'foo';
  return nock('https://api.foursquare.com')
    .get(`/v2/users/self/checkins?v=${process.env.SWARM_API_VERSION}&oauth_token=foo`)
    .reply(401, invalidAuth);
}

export function instagram() {
  dotEnv.config();
  const instagramFeed = fs.readFileSync('./test/fixtures/instagram.json', 'utf-8');

  return nock('https://api.instagram.com')
    .get(`/v1/users/self/media/recent?access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`)
    .reply(200, instagramFeed);
}

export function twitter(fakeResponse) {
  return nock('https://api.twitter.com')
    .get('/1.1/statuses/user_timeline.json?screen_name=_greg_stewart_')
    .reply(200, fakeResponse);
}

export function vimeo() {
  dotEnv.config();
  const feed = fs.readFileSync('./test/fixtures/vimeo.json', 'utf-8');
  return nock('https://api.vimeo.com')
    .get('/me/videos?page=1&per_page=10')
    .reply(200, feed);
}

export function invalidVimeo(invalidAuth) {
  dotEnv.config();
  process.env.VIMEO_ACCESS_TOKEN = 'foo';
  return nock('https://api.vimeo.com')
    .get('/me/videos?page=1&per_page=10')
    .reply(401, invalidAuth);
}
