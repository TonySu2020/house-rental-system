import { backend } from '../Const';

const url = `${backend}/api/analysis`

export const getOverview = () =>
    fetch(`${url}/overview`)
    .then(response => response.json())