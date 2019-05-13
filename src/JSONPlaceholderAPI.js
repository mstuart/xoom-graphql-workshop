const { RESTDataSource } = require('apollo-datasource-rest');

class JSONPlaceholderAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com/';
  }

  async getAlbums() {
    return this.get('albums');
  }

  async getUserById(id) {
    return this.get(`/users/${id}`);
  }
}

module.exports = JSONPlaceholderAPI;
