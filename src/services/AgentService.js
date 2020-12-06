import { backend } from '../Const';

const url = `${backend}/api`

export const login = (loginForm) =>
    fetch(`${url}/login`,{
        method:'POST',
        body: JSON.stringify(loginForm),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())