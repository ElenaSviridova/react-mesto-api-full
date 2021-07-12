import {BASE_URL} from './auth';

export class Api {
    constructor({adress, headers}) {
        this._adress = adress;
        this._headers = headers;
    }

    _getResponseData(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`Ошибка ${response.status}`))
    }

    getProfileInfo() {
        return fetch(`${this._adress}/users/me`, {
            headers: this._headers
        }).then(this._getResponseData)
    }

    changeProfileInfo(profileName, profileAbout) {
        return fetch(`${this._adress}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: profileName,
              about: profileAbout
            })
        })
        .then(this._getResponseData)
    }

    getInitialCards() {
        return  fetch(`${this._adress}/cards`,{
            headers: this._headers
        }).then(this._getResponseData)
    }

    addCard(data) {
        return fetch(`${this._adress}/cards`, {
            method: 'POST',
            headers: this._headers,
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
            headers: this._headers
        })
        .then(this._getResponseData)  
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._adress}/cards/likes/${cardId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
        .then(this._getResponseData)
    }

    updateAvatar(avatarLink) {
        return fetch(`${this._adress}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              avatar: avatarLink
            })
        })
        .then(this._getResponseData)
    }
}

const api = new Api({adress: BASE_URL, headers: {
    'Content-type': 'application/json'
}});
// const api = new Api({adress: BASE_URL, token:'3df83bef-b96a-43f8-aaa6-dee5c669d99f'});

export default api