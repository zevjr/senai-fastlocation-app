import { fetchAddressByCep, fetchAddressBySearch } from '../repositories/homeRepository';
import { saveAddressToHistory, saveLastAddress } from '../../../shared/storage';
import { Address, AddressSearchParams } from '../model/Address';

const isValidCep = (cep: string): boolean => {
  const cleaned = cep.replace(/\D/g, '');
  return cleaned.length === 8;
};

const cleanCep = (cep: string): string => cep.replace(/\D/g, '');

export const searchByCep = async (cep: string): Promise<Address> => {
  if (!isValidCep(cep)) {
    throw new Error('CEP inválido. Digite 8 dígitos numéricos.');
  }

  const address = await fetchAddressByCep(cleanCep(cep));

  if (!address.erro) {
    await saveAddressToHistory(address);
    await saveLastAddress(address);
  }

  return address;
};

export const searchByAddress = async (
  params: AddressSearchParams,
): Promise<Address[]> => {
  const { uf, city, street } = params;

  if (!uf.trim() || !city.trim() || !street.trim()) {
    throw new Error('Preencha todos os campos: UF, cidade e rua.');
  }

  const addresses = await fetchAddressBySearch(params);
  const results = addresses ?? [];

  if (results.length > 0) {
    await saveLastAddress(results[0]);
    await Promise.all(results.map((addr) => saveAddressToHistory(addr)));
  }

  return results;
};
