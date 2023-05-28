export interface DeleteReservationRequest {
  ownerPhoneNumber?: string;
  companyName: string;
  date: Date;
  start: Date;
  end: Date;
  serviceName: string;
}
