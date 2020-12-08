import { backend } from '../Const';

const url = `${backend}/api/owners`

export const getAllOwner = () =>
    fetch(url)
    .then(response => response.json())

export const getOwnerById = (id) =>
    fetch(`${url}/${id}`)
    .then(response => response.json())

export const getOwnerByEmail = (email) =>
    fetch(`${url}/email/${email}`)
    .then(response => response.json())

export const getOwnerByPhone = (phone) =>
    fetch(`${url}/phone/${phone}`)
    .then(response => response.json())

export const addOwner = (owner) =>
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(owner),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())

export const deleteOwnerById = (id) =>
    fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())

  export const hardDeleteOwnerById = (id) =>
    fetch(`${url}/${id}/hard`, {
      method: 'DELETE'
    })
    .then(response => response.json())

export const updateOwner = (id, owner) =>
    fetch(`${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(owner),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())