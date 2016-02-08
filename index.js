
'use strict';


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
exports.connect = opts => {

  opts = opts || {};

  return new Promise((resolve, reject) => {

    if (typeof opts.redisUrl !== 'string')
      return reject(new Error('redisUrl is required.'));


    // Assign a debug flag
    if (opts.logger !== false) {
      opts.debug = true;
    }

    // Setup a Logging Provider
    opts.logger = typeof opts.logger === 'function'
                    ? opts.logger
                    : console.log;


    // Init the Client
    const Client = new Redis(redisUrl);

    // Setting up Redis Logging
    if (opts.debug) {
      require('./lib/debug')(opts.redisUrl, opts.logger);
    }


    // Redis Start
    Client.on('ready', function(err) {
      opts.logger('Redis Connected');
      return resolve(Client);
    })
    .on('error', function(err) {
      opts.logger(err);
      return reject(err);
    });

  });
};
