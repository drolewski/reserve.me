import {ReservationRequest} from './ReservationRequest';
import {parseResponse} from '../authorization/AuthorizationService';
import {DeleteReservationRequest} from './DeleteReservationRequest';
import { apiURL } from '../../const/RegExp';

export const getCompanyReservation = (companyName: string) => {
  return fetch(`${apiURL}/reservation/companyName/${companyName}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const reserveApi = (reserveRequest: ReservationRequest) => {
  return fetch(`${apiURL}/reservation`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reserveRequest),
  })
    .then(parseResponse)
    .catch(error => console.error(error));
}

export const userReservationsApi = (ownerPhoneNumber: string) => {
  return fetch(`${apiURL}/reservation/${ownerPhoneNumber}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const deleteUserReservationApi = (deleteReservationRequest: DeleteReservationRequest) => {
  return fetch(`${apiURL}/reservation`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(deleteReservationRequest),
  })
    .then(parseResponse)
    .catch(error => console.error(error));
}
