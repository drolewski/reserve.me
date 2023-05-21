import {CompanyRequest} from './CompanyRequest';
import {parseResponse} from '../authorization/AuthorizationService';

export const getCompanyList = (phoneNumber: string) => {
  return fetch(`http://localhost:8080/company/${phoneNumber}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getCategories = () => {
  return fetch(`http://localhost:8080/category`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const saveCompanyApiCall = (companyRequest: CompanyRequest) => {
  return fetch(`http://localhost:8080/company`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(companyRequest),
  }).then(parseResponse)
    .catch(console.log)
}
