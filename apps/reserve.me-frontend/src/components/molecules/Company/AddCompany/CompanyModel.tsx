export interface CompanyModel {
  name?: string;
  description?: string;
  category?: string[];
  address?: AddressRequest;
  contact?: ContactRequest;
  services?: ServiceRequest[]
  openingHours?: OpeningHours[];
}

export interface AddressRequest {
  street?: string;
  number?: string;
  city?: string;
  postCode?: string;
}

export interface ContactRequest {
  email?: string;
  phoneNumber?: string;
}

export interface ServiceRequest {
  name?: string;
  price?: number;
  serviceTime?: number;
  weekDays?: WeekDay[];
}

export enum WeekDay {
  MONDAY="MONDAY",
  TUESDAY="TUESDAY",
  WEDNESDAY="WEDNESDAY",
  THURSDAY="THURSDAY",
  FRIDAY="FRIDAY",
  SATURDAY="SATURDAY",
  SUNDAY="SUNDAY"
}

export interface OpeningHours {
  weekDay?: WeekDay;
  open?: string;
  close?: string;
}

export interface ServiceTime {
  startTime?: Date;
  endTime?: Date;
}