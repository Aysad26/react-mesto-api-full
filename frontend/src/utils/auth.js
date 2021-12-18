const BASE_URL = 'http://api.mesto.aysad26.nomoredomains.rocks'

const handleResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка - ${res.status} - ${res.statusText}`)
  
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(handleResponse)
}

export const login = (email, password) => {
  return fetch (`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
   .then(handleResponse)
}

export const checkToken = (token) => {
  return fetch (`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
   .then(handleResponse)
}