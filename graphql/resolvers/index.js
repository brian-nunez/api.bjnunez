const artistResolver = require('./artists');
const albumResolver = require('./albums');
const songResolver = require('./songs');

const rootResolver = {
  ...artistResolver,
  ...albumResolver,
  ...songResolver,
};

module.exports = rootResolver;
