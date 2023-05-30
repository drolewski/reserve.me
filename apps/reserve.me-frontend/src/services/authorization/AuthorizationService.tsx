import {RegistrationRequest} from './RegisterRequest';
import {LoginRequest} from './LoginRequest';
import {AuthorizationRequest} from './AuthorizationRequest';
import { apiURL } from '../../const/RegExp';

export const register = (registerRequest: RegistrationRequest) => {
  return fetch(`${apiURL}/user/register`, {
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
  return fetch(`${apiURL}/user/login`, {
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
  return fetch(`${apiURL}/user/authorize`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authorizationRequest),
  }).then(parseResponse)
    .catch(error => console.error(error))
}

export const parseResponse = (response: Response) => {
  if (response.status !== 200) {
    return response.json();
  }
}
