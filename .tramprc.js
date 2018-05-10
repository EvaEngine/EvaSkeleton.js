require('dotenv').config();
module.exports = JSON.parse(
  require('child_process').execSync('LOG_LEVEL=error ./engine tramp:dump-config')
);
