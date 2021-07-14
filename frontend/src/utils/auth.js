export const BASE_URL = 'https://api.sviridova.students.nomoredomains.club';
// export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (response) => {
  console.log("check response ", response);
  return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`)
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
  
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
};

export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(checkResponse)
};


export const logout = () => {
  return fetch(`${BASE_URL}/users/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(checkResponse)
};
