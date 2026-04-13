import { renderHook, act } from '@testing-library/react-native';
import { useHistoryController } from '../../../src/modules/history/controller/useHistoryController';
import * as storage from '../../../src/shared/storage';
import { Address } from '../../../src/modules/home/model/Address';

jest.mock('../../../src/shared/storage');

const mockAddress: Address = {
  cep: '01310-100',
  logradouro: 'Avenida Paulista',
  complemento: '',
  bairro: 'Bela Vista',
  localidade: 'São Paulo',
  uf: 'SP',
};

const getHistoryMock = storage.getHistory as jest.MockedFunction<
  typeof storage.getHistory
>;
const clearHistoryMock = storage.clearHistory as jest.MockedFunction<
  typeof storage.clearHistory
>;

describe('useHistoryController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should start with empty history and no error', () => {
    getHistoryMock.mockResolvedValue([]);
    const { result } = renderHook(() => useHistoryController());
    expect(result.current.history).toHaveLength(0);
    expect(result.current.error).toBeNull();
  });

  it('should load history successfully', async () => {
    getHistoryMock.mockResolvedValue([mockAddress]);

    const { result } = renderHook(() => useHistoryController());

    await act(async () => {
      await result.current.loadHistory();
    });

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].cep).toBe(mockAddress.cep);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should return empty history when none exists', async () => {
    getHistoryMock.mockResolvedValue([]);

    const { result } = renderHook(() => useHistoryController());

    await act(async () => {
      await result.current.loadHistory();
    });

    expect(result.current.history).toHaveLength(0);
    expect(result.current.loading).toBe(false);
  });

  it('should set error when loading history fails', async () => {
    getHistoryMock.mockRejectedValue(new Error('Storage error'));

    const { result } = renderHook(() => useHistoryController());

    await act(async () => {
      await result.current.loadHistory();
    });

    expect(result.current.error).toBe('Erro ao carregar histórico.');
    expect(result.current.history).toHaveLength(0);
    expect(result.current.loading).toBe(false);
  });

  it('should clear history', async () => {
    getHistoryMock.mockResolvedValue([mockAddress]);
    clearHistoryMock.mockResolvedValue(undefined);

    const { result } = renderHook(() => useHistoryController());

    await act(async () => {
      await result.current.loadHistory();
    });

    expect(result.current.history).toHaveLength(1);

    await act(async () => {
      await result.current.handleClearHistory();
    });

    expect(result.current.history).toHaveLength(0);
    expect(clearHistoryMock).toHaveBeenCalledTimes(1);
  });
});
