
'use strict';

/**
 * Module dependencies.
 * @private
 */
const Redis = require('ioredis');


/**
 * @params {String} opts.redisUrl (Required)
 * @params {Boolean} opts.debug (Optional, Default = true)
 *
 * @return {Promise}
 * @public
 */
exports.connect = opts => {

  opts = Object.assign({
    debug: true
  }, opts);


  return new Promise((resolve, reject) => {

    if (typeof opts.redisUrl !== 'string')
      return reject(new Error('redisUrl is required.'));


    // Init the Client
    const Client = new Redis(opts.redisUrl)

    .on('ready', function(err) {
      logger.info('Redis Connected');

      // Setting up Redis Logging
      if (opts.debug) {
        require('./lib/debug')(opts.redisUrl);
      }

      return resolve(Client);
    })
    .on('error', function(err) {
      logger.error(err);
      return reject(err);
    });

  });
};
