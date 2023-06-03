const MOCK_SERVER = 'http://localhost:3000/';

const PROXY_CONFIG = {
  '/api': {
    target: MOCK_SERVER,
    secure: false,
    logLevel: 'debug',
    changeOrigin: true
  }
};

module.exports = PROXY_CONFIG;
