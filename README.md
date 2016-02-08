# redis-client
Nodejs client for Redis

----

## Usage

```js
const Redis = require('redis-client');

/**
 * @params {String} opts.redisUrl (Required)
 *
 * @params {Boolean|Function} opts.logger
 *           - Can be a Boolean (True = Default=console)
 *           - Logger Function(msg, context)
 *
 * @return {Promise}
 * @public
 */
// Once models have been created, Connect!
Redis.connect({
  redisUrl: 'redis://:authpassword@127.0.0.1:6380/4'
})
.then(function(redicClient) {
  console.log(redicClient);
})
.catch(function(e) {
  console.log(e);
});
```


#### Run Tests
```bash
$ npm test

# OR for continuous testing
$ nodemon --exec "npm test"
```
