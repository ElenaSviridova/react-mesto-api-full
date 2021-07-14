import {BASE_URL} from './auth';

export class Api {
    constructor({adress, token}) {
        this._adress = adress;
        this._token = token;
    }

    _getResponseData(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`Ошибка ${response.status}`))
    }

    getProfileInfo() {
        return fetch(`${this._adress}/users/me`, {
            headers: {
                authorization: this._token
            }
        }).then(this._getResponseData)
    }

    changeProfileInfo(profileName, profileAbout) {
        return fetch(`${this._adress}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              name: profileName,
              about: profileAbout
            })
        })
        .then(this._getResponseData)
    }

    getInitialCards() {
        return  fetch(`${this._adress}/cards`,{
            headers: {
                authorization: this._token
            }
        }).then(this._getResponseData)
    }

    addCard(data) {
        return fetch(`${this._adress}/cards`, {
            method: 'POST',
            headers: {
                authorization:this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._getResponseData)
    }

    removeCards(id) {
        return  fetch(`${this._adress}/cards/${id}`,{
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(this._getResponseData)  
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._adress}/cards/likes/${cardId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: {
                authorization:this._token
            }
        })
        .then(this._getResponseData)
    }

    updateAvatar(avatarLink) {
        return fetch(`${this._adress}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              avatar: avatarLink
            })
        })
        .then(this._getResponseData)
    }
}

const api = new Api({adress: BASE_URL, token: localStorage.getItem('token') });

export default api