import {AddressResponse, ProfileResponse} from './UserDataResponse';

export interface UpdateUserRequest {
  profile?: ProfileResponse;
  address?: AddressResponse;
}
