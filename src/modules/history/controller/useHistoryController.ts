import { useState, useCallback } from 'react';
import { Address } from '../../home/model/Address';
import { getHistory, clearHistory } from '../../../shared/storage';

export const useHistoryController = () => {
  const [history, setHistory] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const data = await getHistory();
      setHistory(data);
    } catch {
      setError('Erro ao carregar histórico.');
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClearHistory = useCallback(async (): Promise<void> => {
    try {
      await clearHistory();
      setHistory([]);
    } catch {
      setError('Erro ao limpar histórico.');
    }
  }, []);

  return {
    history,
    loading,
    error,
    loadHistory,
    handleClearHistory,
  };
};
