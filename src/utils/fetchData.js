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
    const paths = [this.baseUrl, path, name, pass, id];
    const fetchUrl = paths.filter((el) => el).join('/');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const fetchObj = { method, body, headers };

    if (method === 'GET') {
      delete fetchObj.body;
    }

    if (path === 'signin') {
      delete headers.Authorization;
    }

    return fetch(fetchUrl, fetchObj).then((response) => response.json());

    //   if (method === 'GET') {
    //     return fetch(`${this.baseUrl}/${path}/${name}/${pass}`, {
    //       method,
    //       headers,
    //     }).then((response) => response.json());
    //   }

    //   if (!id) {
    //     return fetch(`${this.baseUrl}/${path}`, {
    //       method,
    //       body,
    //       headers,
    //     }).then((resp) => resp.json());
    //   }

    //   return fetch(`${this.baseUrl}/${path}/${id}`, {
    //     method,
    //     body,
    //     headers,
    //   });
  }
}
