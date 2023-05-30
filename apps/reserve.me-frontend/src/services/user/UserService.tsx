import {UpdateUserRequest} from './UpdateUserRequest';
import {parseResponse} from '../authorization/AuthorizationService';
import { apiURL } from '../../const/RegExp';

export const userApi = (phoneNumber: string) => {
  return fetch(`${apiURL}/user/${phoneNumber}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const updateUser = (phoneNumber: string, updateUser: UpdateUserRequest) => {
  return fetch(`${apiURL}/user/${phoneNumber}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateUser),
  }).then(parseResponse)
    .catch(console.log);
}
