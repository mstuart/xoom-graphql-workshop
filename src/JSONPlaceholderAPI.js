const { RESTDataSource } = require('apollo-datasource-rest');
const https = require('https');

class JSONPlaceholderAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com/';
  }

  // Depending on your network setup in dev-mode, you might get SSL cert errors
  // with this API, so we will ignore them for now.
  willSendRequest(request) {
    request.agent = new https.Agent({
      rejectUnauthorized: false
    });
  }

  async getAlbums() {
    return this.get('albums');
  }

  async getAlbumById(id) {
    return this.get(`albums/${id}`);
  }

  async getUserById(id) {
    return this.get(`users/${id}`);
  }
}

module.exports = JSONPlaceholderAPI;
