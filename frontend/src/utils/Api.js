export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  changeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then(this._getResponseData)
  }

   changeUserImage(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: url
        })
      })
      .then(this._getResponseData)
  }
  
  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ 
        name: name, 
        link: link 
      }),
    })
    .then(this._getResponseData)
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponseData)
  }
  
  setLike(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  deleteLike(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  changeCardStatus (cardId, isLiked) {
    return isLiked ? this.deleteCard(cardId) : this.addCard(cardId);
  }

  changeLikeCardStatus(card, isLiked) {
    if (isLiked) {
      return this.setLike(card);
    } else {
      return this.deleteLike(card);
    }
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'e02ab8b7-b6ac-4103-9bf7-1aa081d397f1',
    'Content-Type': 'application/json'
  }
});

export default api