export interface UserDataResponse {
  userName: string;
  phoneNumber: string;
  profile?: ProfileResponse;
  address?: AddressResponse;
}

export interface ProfileResponse {
  name?: string;
  surname?: string;
  sex?: string;
  birthday?: Date;
}

export interface AddressResponse {
  street?: string;
  number?: string;
  city?: string;
  postCode?: string;
}
