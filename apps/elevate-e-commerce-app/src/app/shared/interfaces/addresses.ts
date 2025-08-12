export interface AddressesRes {
  message: 'string';
  addresses: Addresses[];
}

export interface DeleteAddressesRes {
  message: 'string';
  address: Addresses[];
}

export interface Addresses {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
  _id: string;
}

export interface CreateAddresses {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
}

export interface Position {
  lat: number;
  long: number;
}

export interface State {
  currentStep: number;
  city: string;
  street: string;
  phone: string;
  lat: number;
  long: number;
  username: string;
}
