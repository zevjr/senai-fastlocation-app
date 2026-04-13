import { viaCepApi } from '../../../http';
import { Address, AddressSearchParams } from '../model/Address';

export const fetchAddressByCep = async (cep: string): Promise<Address> => {
  const { data } = await viaCepApi.get<Address>(`/${cep}/json`);
  return data;
};

export const fetchAddressBySearch = async (
  params: AddressSearchParams,
): Promise<Address[]> => {
  const { uf, city, street } = params;
  const encodedCity = encodeURIComponent(city);
  const encodedStreet = encodeURIComponent(street);
  const { data } = await viaCepApi.get<Address[]>(
    `/${uf}/${encodedCity}/${encodedStreet}/json`,
  );
  return data;
};
