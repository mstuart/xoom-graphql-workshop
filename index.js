// To ignore SSL errors that could occur in dev-mode depending on your network
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

require('./src/server');
