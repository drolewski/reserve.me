import {CompanyRequest} from './CompanyRequest';
import {parseResponse} from '../authorization/AuthorizationService';
import { apiURL } from '../../const/RegExp';

export const getCompanyList = (phoneNumber: string) => {
  return fetch(`${apiURL}/company/${phoneNumber}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getCategories = () => {
  return fetch(`${apiURL}/category`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const saveCompanyApiCall = (companyRequest: CompanyRequest) => {
  return fetch(`${apiURL}/company`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(companyRequest),
  }).then(parseResponse)
    .catch(console.log)
}

export const updateCompanyApiCall = (companyRequest: CompanyRequest) => {
  return fetch(`${apiURL}/company/update`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(companyRequest),
  }).then(parseResponse)
    .catch(console.log)
}

export const deleteCompanyApiCall = (phoneNumber: string, companyName: string) => {
  return fetch(`${apiURL}/company/${phoneNumber}/${companyName}`, {
    method: 'DELETE',
  }).then(parseResponse)
    .catch(console.log)
}

export const getAllCompanies = () => {
  return fetch(`${apiURL}/company`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getCompany = (companyName: string) => {
  return fetch(`${apiURL}/company/name/${companyName}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getCompanyDetails = (phoneNumber: string, companyName: string) => {
  return fetch(`${apiURL}/company/${phoneNumber}/${companyName}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}
