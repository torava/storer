var config = {};

config.db = 'mongodb://localhost:27017/storer';
config.port = process.env.PORT || 3000;

module.exports = config;