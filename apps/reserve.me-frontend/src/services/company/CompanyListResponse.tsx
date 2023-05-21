export interface CompanyListResponse {
  name: string;
  contact: Contact;
  address: Address;
  category: string[];
}

export interface Contact {
  email: string;
  phoneNumber: string;
}

export interface Address {
  street: string;
  number: string;
  city: string;
  postCode: string;
}