export interface ReservationRequest {
  companyName: string;
  reserved: Reserved;
}

export interface Reserved {
  ownerPhoneNumber: string;
  date: Date;
  start: string;
  end?: Date;
  serviceName: string;
}