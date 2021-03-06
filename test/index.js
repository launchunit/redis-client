
const test = require('ava');

// Global Logger
require('logger')({ level: 'debug' });

// Init Things
const client = require('../');
var Redis;


test('Connect to Redis (redisUrl Not Passed)', t => {

  return client.connect()
  .then(function(res) {
    t.is(res, undefined);
  })
  .catch(function(e) {
    console.log(e);
    t.ok(e instanceof Error);
  });
});

test('Connect to Redis (redisUrl is Incorrect)', t => {

  return client.connect({
    redisUrl: 'redis://sssss'
  })
  .then(function(res) {
    t.is(res, undefined);
  })
  .catch(function(e) {
    t.ok(e instanceof Error);
  });
});

test('Connect to Redis', t => {

  return client.connect({
    redisUrl: process.env.REDIS_URL
  })
  .then(function(res) {
    Redis = res;
    t.ok(res.serverInfo);
    t.ok(res);
  })
  .catch(function(e) {
    t.is(e, undefined);
  });
});

test('Connect to Redis (Disabled Logger)', t => {

  return client.connect({
    redisUrl: process.env.REDIS_URL,
    logger: false
  })
  .then(function(res) {
    Redis = res;
    t.ok(res.serverInfo);
    t.ok(res);
  })
  .catch(function(e) {
    t.is(e, undefined);
  });
});
