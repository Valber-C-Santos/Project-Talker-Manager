const crypto = require('crypto');

function Token() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = Token;
