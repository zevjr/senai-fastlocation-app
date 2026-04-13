import { renderHook, act } from '@testing-library/react-native';
import { useHomeController } from '../../../src/modules/home/controller/useHomeController';
import { useHomeStore } from '../../../src/modules/home/controller/homeStore';
import * as homeService from '../../../src/modules/home/service/homeService';
import * as storage from '../../../src/shared/storage';
import { Address } from '../../../src/modules/home/model/Address';

jest.mock('../../../src/modules/home/service/homeService');
jest.mock('../../../src/shared/storage');

const mockAddress: Address = {
  cep: '01310-100',
  logradouro: 'Avenida Paulista',
  complemento: '',
  bairro: 'Bela Vista',
  localidade: 'São Paulo',
  uf: 'SP',
};

const searchByCepMock = homeService.searchByCep as jest.MockedFunction<
  typeof homeService.searchByCep
>;
const searchByAddressMock = homeService.searchByAddress as jest.MockedFunction<
  typeof homeService.searchByAddress
>;
const getLastAddressMock = storage.getLastAddress as jest.MockedFunction<
  typeof storage.getLastAddress
>;

describe('useHomeController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getLastAddressMock.mockResolvedValue(null);
    useHomeStore.setState({
      loading: false,
      error: null,
      results: [],
      lastAddress: null,
    });
  });

  it('should load last address on mount', async () => {
    getLastAddressMock.mockResolvedValue(mockAddress);

    const { result } = renderHook(() => useHomeController());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    expect(result.current.lastAddress).toEqual(mockAddress);
  });

  it('should start with empty state', () => {
    const { result } = renderHook(() => useHomeController());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.results).toHaveLength(0);
  });

  it('should set results after successful CEP search', async () => {
    searchByCepMock.mockResolvedValue(mockAddress);

    const { result } = renderHook(() => useHomeController());

    await act(async () => {
      await result.current.handleSearchByCep('01310100');
    });

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0]).toEqual(mockAddress);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should set error when address has erro flag', async () => {
    const errorAddress: Address = { ...mockAddress, erro: true };
    searchByCepMock.mockResolvedValue(errorAddress);

    const { result } = renderHook(() => useHomeController());

    await act(async () => {
      await result.current.handleSearchByCep('00000000');
    });

    expect(result.current.error).toBe('CEP não encontrado.');
    expect(result.current.results).toHaveLength(0);
    expect(result.current.loading).toBe(false);
  });

  it('should set error message when search throws', async () => {
    searchByCepMock.mockRejectedValue(new Error('CEP inválido'));

    const { result } = renderHook(() => useHomeController());

    await act(async () => {
      await result.current.handleSearchByCep('123');
    });

    expect(result.current.error).toBe('CEP inválido');
    expect(result.current.loading).toBe(false);
  });

  it('should set results after successful address search', async () => {
    searchByAddressMock.mockResolvedValue([mockAddress]);

    const { result } = renderHook(() => useHomeController());

    await act(async () => {
      await result.current.handleSearchByAddress({
        uf: 'SP',
        city: 'São Paulo',
        street: 'Avenida Paulista',
      });
    });

    expect(result.current.results).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('should set error when address search returns empty', async () => {
    searchByAddressMock.mockResolvedValue([]);

    const { result } = renderHook(() => useHomeController());

    await act(async () => {
      await result.current.handleSearchByAddress({
        uf: 'SP',
        city: 'São Paulo',
        street: 'Rua Inexistente',
      });
    });

    expect(result.current.error).toBe('Nenhum endereço encontrado.');
    expect(result.current.results).toHaveLength(0);
  });
});
