export default class FetchData {
  constructor(url) {
    this.baseUrl = url;
  }

  _defaultMethod(method, path = '', name = '', pass = '', body = '', id = '') {
    if (method === 'GET') {
      return fetch(`${this.baseUrl}/${path}/${name}/${pass}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json());
    }

    return fetch(`${this.baseUrl}/${path}/${id}`, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
