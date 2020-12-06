import { backend } from '../Const';

const url = `${backend}/api/houses`

export const getAllHouse = () =>
    fetch(url)
    .then(response => response.json())

export const getHouseById = (id) =>
    fetch(`${url}/${id}`)
    .then(response => response.json())

export const addHouse = (house) =>
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(house),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())

export const deleteHouseById = (id) =>
    fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())

export const updateHouse = (id, house) =>
    fetch(`${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(house),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())