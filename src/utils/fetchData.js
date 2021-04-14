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

  getWords(page = 0, group = 0) {
    return this._defaultMethod('GET', `words?page=${page}&group=${group}`);
  }

  getUsersWords(userId, token) {
    return this._defaultMethod('GET', 'users', userId, 'words', null, null, token);
  }

  _defaultMethod(method, path = '', name = '', pass = '', body = '', id = '', token = '') {
    if (method === 'GET') {
      return fetch(`${this.baseUrl}/${path}/${name}/${pass}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
