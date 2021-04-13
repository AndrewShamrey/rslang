export default class FetchData {
  constructor(url) {
    this.baseUrl = url;
    // this.baseUrl = 'http://localhost:4000';
  }

  signinPerson(email, password) {
    const body = JSON.stringify({ email, password });
    return this._defaultMethod('POST', 'signin', null, null, body);
  }

  postNewPerson(body) {
    return this._defaultMethod('POST', 'users', null, null, body);
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

    if (!id) {
      return fetch(`${this.baseUrl}/${path}`, {
        method,
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((resp) => resp.json());
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
