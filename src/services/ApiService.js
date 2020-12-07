export const getCityByZipCode = (postcode) =>
fetch(`http://ZiptasticAPI.com/${postcode}`).then(response => response.json())
