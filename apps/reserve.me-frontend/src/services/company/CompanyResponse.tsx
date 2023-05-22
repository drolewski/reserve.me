import {OpeningHours, ServiceRequest} from './CompanyRequest';
import {Address, Contact} from './CompanyListResponse';

export interface CompanyResponse {
  name: string;
  category: string[];
  description: string;
  openingHours: OpeningHours[];
  contact: Contact;
  services: ServiceRequest[];
  address: Address;
}
