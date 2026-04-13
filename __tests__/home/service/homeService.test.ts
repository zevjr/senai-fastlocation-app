import { searchByCep, searchByAddress } from '../../../src/modules/home/service/homeService';
import * as homeRepository from '../../../src/modules/home/repositories/homeRepository';
import * as storage from '../../../src/shared/storage';
import { Address } from '../../../src/modules/home/model/Address';

jest.mock('../../../src/modules/home/repositories/homeRepository');
jest.mock('../../../src/shared/storage');

const mockAddress: Address = {
  cep: '01310-100',
  logradouro: 'Avenida Paulista',
  complemento: 'de 610 a 1510 - lado par',
  bairro: 'Bela Vista',
  localidade: 'São Paulo',
  uf: 'SP',
};

const fetchAddressByCepMock = homeRepository.fetchAddressByCep as jest.MockedFunction<
  typeof homeRepository.fetchAddressByCep
>;
const fetchAddressBySearchMock = homeRepository.fetchAddressBySearch as jest.MockedFunction<
  typeof homeRepository.fetchAddressBySearch
>;
const saveAddressToHistoryMock = storage.saveAddressToHistory as jest.MockedFunction<
  typeof storage.saveAddressToHistory
>;
const saveLastAddressMock = storage.saveLastAddress as jest.MockedFunction<
  typeof storage.saveLastAddress
>;

describe('homeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    saveAddressToHistoryMock.mockResolvedValue(undefined);
    saveLastAddressMock.mockResolvedValue(undefined);
  });

  describe('searchByCep', () => {
    it('should return address and save to history on valid CEP', async () => {
      fetchAddressByCepMock.mockResolvedValue(mockAddress);

      const result = await searchByCep('01310100');

      expect(fetchAddressByCepMock).toHaveBeenCalledWith('01310100');
      expect(saveAddressToHistoryMock).toHaveBeenCalledWith(mockAddress);
      expect(saveLastAddressMock).toHaveBeenCalledWith(mockAddress);
      expect(result).toEqual(mockAddress);
    });

    it('should strip non-numeric characters from CEP', async () => {
      fetchAddressByCepMock.mockResolvedValue(mockAddress);

      await searchByCep('01310-100');

      expect(fetchAddressByCepMock).toHaveBeenCalledWith('01310100');
    });

    it('should throw error for CEP with less than 8 digits', async () => {
      await expect(searchByCep('123')).rejects.toThrow(
        'CEP inválido. Digite 8 dígitos numéricos.',
      );
      expect(fetchAddressByCepMock).not.toHaveBeenCalled();
    });

    it('should throw error for empty CEP', async () => {
      await expect(searchByCep('')).rejects.toThrow('CEP inválido');
    });

    it('should NOT save to history when address has erro flag', async () => {
      const errorAddress: Address = { ...mockAddress, erro: true };
      fetchAddressByCepMock.mockResolvedValue(errorAddress);

      const result = await searchByCep('00000000');

      expect(saveAddressToHistoryMock).not.toHaveBeenCalled();
      expect(saveLastAddressMock).not.toHaveBeenCalled();
      expect(result.erro).toBe(true);
    });
  });

  describe('searchByAddress', () => {
    it('should return addresses and save to history', async () => {
      fetchAddressBySearchMock.mockResolvedValue([mockAddress]);

      const result = await searchByAddress({
        uf: 'SP',
        city: 'São Paulo',
        street: 'Avenida Paulista',
      });

      expect(fetchAddressBySearchMock).toHaveBeenCalled();
      expect(saveLastAddressMock).toHaveBeenCalledWith(mockAddress);
      expect(saveAddressToHistoryMock).toHaveBeenCalledWith(mockAddress);
      expect(result).toHaveLength(1);
    });

    it('should throw error when uf is empty', async () => {
      await expect(
        searchByAddress({ uf: '', city: 'São Paulo', street: 'Rua A' }),
      ).rejects.toThrow('Preencha todos os campos');
    });

    it('should throw error when city is empty', async () => {
      await expect(
        searchByAddress({ uf: 'SP', city: '', street: 'Rua A' }),
      ).rejects.toThrow('Preencha todos os campos');
    });

    it('should throw error when street is empty', async () => {
      await expect(
        searchByAddress({ uf: 'SP', city: 'São Paulo', street: '' }),
      ).rejects.toThrow('Preencha todos os campos');
    });

    it('should return empty array when no addresses found', async () => {
      fetchAddressBySearchMock.mockResolvedValue([]);

      const result = await searchByAddress({
        uf: 'SP',
        city: 'São Paulo',
        street: 'Rua Inexistente',
      });

      expect(result).toHaveLength(0);
      expect(saveLastAddressMock).not.toHaveBeenCalled();
    });
  });
});
