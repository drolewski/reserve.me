export interface ReservationListResponse {
  companyName: string;
  reserved: Reserved[];
}

export interface Reserved {
  ownerPhoneNumber: string;
  date: Date; // Date
  start: Date; // Time
  end: Date; // Time
  serviceName: string;
  employee: string;
}
