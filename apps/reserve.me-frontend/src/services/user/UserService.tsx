import {UpdateUserRequest} from './UpdateUserRequest';
import {parseResponse} from '../authorization/AuthorizationService';

export const userApi = (phoneNumber: string) => {
  return fetch(`http://localhost:8080/user/${phoneNumber}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const updateUser = (phoneNumber: string, updateUser: UpdateUserRequest) => {
  return fetch(`http://localhost:8080/user/${phoneNumber}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateUser),
  }).then(parseResponse)
    .catch(console.log);
}
