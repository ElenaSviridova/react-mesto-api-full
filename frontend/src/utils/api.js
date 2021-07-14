import {BASE_URL} from './auth';

export class Api {
    constructor({adress}) {
        this._adress = adress;
    }

    _getResponseData(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`Ошибка ${response.status}`))
    }

    getProfileInfo() {
        return fetch(`${this._adress}/users/me`, {
            credentials: 'include',
            }
        ).then(this._getResponseData)
    }

    changeProfileInfo(profileName, profileAbout) {
        return fetch(`${this._adress}/users/me`, {
            method: 'PATCH',
            credentials: 'include', 
            headers: {
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
            credentials: 'include',
        }).then(this._getResponseData)
    }

    addCard(data) {
        return fetch(`${this._adress}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
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
            credentials: 'include'
        })
        .then(this._getResponseData)  
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._adress}/cards/likes/${cardId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            credentials: 'include'
        })
        .then(this._getResponseData)
    }

    updateAvatar(avatarLink) {
        return fetch(`${this._adress}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              avatar: avatarLink
            })
        })
        .then(this._getResponseData)
    }
}

const api = new Api({adress: BASE_URL});
// const api = new Api({adress: BASE_URL, token:'3df83bef-b96a-43f8-aaa6-dee5c669d99f'});

export default api