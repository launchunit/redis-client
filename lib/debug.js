
'use strict';

/**
 * Module dependencies.
 * @private
 */
const Redis = require('ioredis');


/**
 * @params {String} redisUrl (Required)
 *
 * @private
 */
module.exports = redisUrl => {

  // Start Redis Monitoring on a Seperate Connection
  new Redis(redisUrl)
  .monitor(function (err, monitor) {

    // Tail the log for the following commands
    var CMDS = ['zcard','zadd',
                'flushall','zincrby',
                'zscore','zrevrank',
                'zcard'];

    // Log Things
    monitor.on('monitor', function (time, args) {
      if (!!~ CMDS.indexOf(args[0])) {
        logger.info(args);
      }
    });
  });

};
