import { backend } from '../Const';

const url = `${backend}/api/leases`

export const getAllLease = () =>
    fetch(url)
    .then(response => response.json())

export const getLeaseById = (id) =>
    fetch(`${url}/${id}`)
    .then(response => response.json())

export const addLease = (lease) =>
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(lease),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())

export const deleteLeaseById = (id) =>
    fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())

export const updateLease = (id, lease) =>
    fetch(`${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(lease),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())