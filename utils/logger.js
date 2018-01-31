const logConfig = require('config').log4js;
const log4js = require('log4js');

log4js.addLayout('json', config => function (logEvent) { return JSON.stringify(logEvent) + config.separator; });

log4js.configure(logConfig);

const logger = log4js.getLogger('console');
console.log = logger.info.bind(logger);
console.debug = logger.debug.bind(logger);
console.error = logger.error.bind(logger);

module.exports = function (name) {
  return log4js.getLogger(name);
};
