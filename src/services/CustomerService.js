import { backend } from '../Const';

const url = `${backend}/api/customers`

export const getAllCustomer = () =>
    fetch(url)
    .then(response => response.json())

export const getCustomerById = (id) =>
    fetch(`${url}/${id}`)
    .then(response => response.json())

export const getCustomerByEmail = (email) =>
    fetch(`${url}/email/${email}`)
    .then(response => response.json())

export const getCustomerByPhone = (phone) =>
    fetch(`${url}/phone/${phone}`)
    .then(response => response.json())

export const addCustomer = (customer) =>
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(customer),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())

export const deleteCustomerById = (id) =>
    fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())

export const hardDeleteCustomerById = (id) =>
    fetch(`${url}/${id}/hard`, {
      method: 'DELETE'
    })
    .then(response => response.json())

export const updateCustomer = (id, customer) =>
    fetch(`${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())