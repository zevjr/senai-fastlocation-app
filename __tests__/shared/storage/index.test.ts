import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  saveAddressToHistory,
  getHistory,
  saveLastAddress,
  getLastAddress,
  clearHistory,
} from '../../../src/shared/storage';
import { Address } from '../../../src/modules/home/model/Address';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mockAddress: Address = {
  cep: '01310-100',
  logradouro: 'Avenida Paulista',
  complemento: '',
  bairro: 'Bela Vista',
  localidade: 'São Paulo',
  uf: 'SP',
};

const mockAddress2: Address = {
  cep: '20040-020',
  logradouro: 'Avenida Rio Branco',
  complemento: '',
  bairro: 'Centro',
  localidade: 'Rio de Janeiro',
  uf: 'RJ',
};

describe('shared/storage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  describe('History', () => {
    it('should return empty array when no history exists', async () => {
      const history = await getHistory();
      expect(history).toEqual([]);
    });

    it('should save address to history', async () => {
      await saveAddressToHistory(mockAddress);
      const history = await getHistory();
      expect(history).toHaveLength(1);
      expect(history[0].cep).toBe(mockAddress.cep);
    });

    it('should not duplicate same CEP in history', async () => {
      await saveAddressToHistory(mockAddress);
      await saveAddressToHistory(mockAddress);
      const history = await getHistory();
      expect(history).toHaveLength(1);
    });

    it('should keep most recent address at the top', async () => {
      await saveAddressToHistory(mockAddress);
      await saveAddressToHistory(mockAddress2);
      const history = await getHistory();
      expect(history[0].cep).toBe(mockAddress2.cep);
    });

    it('should update existing CEP and move to top', async () => {
      await saveAddressToHistory(mockAddress);
      await saveAddressToHistory(mockAddress2);
      await saveAddressToHistory(mockAddress);
      const history = await getHistory();
      expect(history[0].cep).toBe(mockAddress.cep);
      expect(history).toHaveLength(2);
    });

    it('should clear history', async () => {
      await saveAddressToHistory(mockAddress);
      await clearHistory();
      const history = await getHistory();
      expect(history).toEqual([]);
    });
  });

  describe('Last Address', () => {
    it('should return null when no last address exists', async () => {
      const result = await getLastAddress();
      expect(result).toBeNull();
    });

    it('should save and retrieve last address', async () => {
      await saveLastAddress(mockAddress);
      const result = await getLastAddress();
      expect(result).not.toBeNull();
      expect(result?.cep).toBe(mockAddress.cep);
    });

    it('should overwrite last address', async () => {
      await saveLastAddress(mockAddress);
      await saveLastAddress(mockAddress2);
      const result = await getLastAddress();
      expect(result?.cep).toBe(mockAddress2.cep);
    });

    it('should clear last address when clearing history', async () => {
      await saveLastAddress(mockAddress);
      await clearHistory();
      const result = await getLastAddress();
      expect(result).toBeNull();
    });
  });
});
