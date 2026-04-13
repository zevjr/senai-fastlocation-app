import { useEffect } from 'react';
import { useHomeStore } from './homeStore';
import { searchByCep, searchByAddress } from '../service/homeService';
import { getLastAddress } from '../../../shared/storage';
import { AddressSearchParams } from '../model/Address';

export const useHomeController = () => {
  const {
    loading,
    error,
    results,
    lastAddress,
    setLoading,
    setError,
    setResults,
    setLastAddress,
    resetSearch,
  } = useHomeStore();

  useEffect(() => {
    void loadLastAddress();
  }, []);

  const loadLastAddress = async (): Promise<void> => {
    const address = await getLastAddress();
    setLastAddress(address);
  };

  const handleSearchByCep = async (cep: string): Promise<void> => {
    resetSearch();
    setLoading(true);

    try {
      const address = await searchByCep(cep);

      if (address.erro) {
        setError('CEP não encontrado.');
        setResults([]);
      } else {
        setResults([address]);
        setLastAddress(address);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao buscar endereço.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByAddress = async (
    params: AddressSearchParams,
  ): Promise<void> => {
    resetSearch();
    setLoading(true);

    try {
      const addresses = await searchByAddress(params);

      if (!addresses || addresses.length === 0) {
        setError('Nenhum endereço encontrado.');
        setResults([]);
      } else {
        setResults(addresses);
        setLastAddress(addresses[0]);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao buscar endereços.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    results,
    lastAddress,
    handleSearchByCep,
    handleSearchByAddress,
    loadLastAddress,
  };
};
