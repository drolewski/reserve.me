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

export const updateCompanyApiCall = (companyRequest: CompanyRequest) => {
  return fetch(`http://localhost:8080/company/update`, {
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
  return fetch(`http://localhost:8080/company/${phoneNumber}/${companyName}`, {
    method: 'DELETE',
  }).then(parseResponse)
    .catch(console.log)
}

export const getAllCompanies = () => {
  return fetch(`http://localhost:8080/company`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getCompany = (companyName: string) => {
  return fetch(`http://localhost:8080/company/name/${companyName}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getCompanyDetails = (phoneNumber: string, companyName: string) => {
  return fetch(`http://localhost:8080/company/${phoneNumber}/${companyName}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}
