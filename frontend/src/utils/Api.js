class Api {
  constructor(config) {
    this._url = config.url
    this._headers = config.headers
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json()
    } else return Promise.reject(`Произошла ошибка - ${res.status}`)
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    }).then(this._getResponseData)
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      method: 'GET'
    }).then(this._getResponseData)
  }

  changeUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._getResponseData)
  }

  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._getResponseData)
  }

  loadCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._handleServerResponse)
  }
  
  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    }).then(this._getResponseData);
  }

  changeUserImage(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(id, owner) {
    const meth = owner ? "PUT" : "DELETE"
    return fetch(`${this._url}cards/${id}/likes`, {
      method: meth,
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    }).then(this._getResponseData);
  }
}

const api = new Api ({
  url: 'http://api.mesto.aysad26.nomoredomains.rocks/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "content-type": "application/json"
  }
})

export default api