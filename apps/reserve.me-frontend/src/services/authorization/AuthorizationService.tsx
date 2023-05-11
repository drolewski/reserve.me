import {RegistrationRequest} from './RegisterRequest';

export const register = (registerRequest: RegistrationRequest) => {
  return fetch('http://localhost:8080/user/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerRequest),
  })
    .then(response => {
      if (response.status !== 200) {
        return response.json();
      }
    })
    .catch(error => console.error(error));
}