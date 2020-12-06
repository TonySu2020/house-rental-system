import { backend } from '../Const';

const url = `${backend}/api/cities`

export const getAllCity = () =>
    fetch(url)
    .then(response => response.json())