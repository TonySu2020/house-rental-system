import { backend } from '../Const';

const url = `${backend}/api/houses`

export const getAllHouse = () =>
    fetch(url)
    .then(response => response.json())

export const getAllByOwnerId = (id) =>
    fetch(`${url}/owner/${id}`)
    .then(response => response.json())

export const getAllByCondition = (zip, bed, bath, min, max, ele, water, gas, net, transit) =>
    fetch(`${url}/condition?zip=${zip}&bed=${bed}&bath=${bath}&min=${min}&max=${max}&ele=${ele}&water=${water}&gas=${gas}&net=${net}&transit=${transit}`)
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

export const hardDeleteHouseById = (id) =>
    fetch(`${url}/${id}/hard`, {
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