import {ReservationRequest} from './ReservationRequest';
import {parseResponse} from '../authorization/AuthorizationService';

export const getCompanyReservation = (companyName: string) => {
  return fetch(`http://localhost:8080/reservation/${companyName}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const reserveApi = (reserveRequest: ReservationRequest) => {
  return fetch('http://localhost:8080/reservation', {
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
