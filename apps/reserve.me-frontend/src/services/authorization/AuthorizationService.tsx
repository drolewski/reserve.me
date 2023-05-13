import {RegistrationRequest} from './RegisterRequest';
import {LoginRequest} from './LoginRequest';
import {AuthorizationRequest} from './AuthorizationRequest';

export const register = (registerRequest: RegistrationRequest) => {
  return fetch('http://localhost:8080/user/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerRequest),
  })
    .then(parseResponse)
    .catch(error => console.error(error));
}

export const login = (loginRequest: LoginRequest) => {
  return fetch('http://localhost:8080/user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginRequest),
  }).then(parseResponse)
    .catch(error => console.error(error));
}

export const authorize = (authorizationRequest: AuthorizationRequest) => {
  return fetch('http://localhost:8080/user/authorize', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authorizationRequest),
  }).then(parseResponse)
    .catch(error => console.error(error))
}

const parseResponse = (response: Response) => {
  console.log(response);
  if (response.status !== 200) {
    return response.json();
  }
}
