import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useHistoryController } from '../controller/useHistoryController';
import { AddressCard } from '../../home/components/AddressCard';
import { LoadingIndicator } from '../../../shared/components/LoadingIndicator';
import { EmptySearch } from '../../home/components/EmptySearch';
import { colors } from '../../../shared/colors';
import { metrics } from '../../../shared/metrics';

export const HistoryPage: React.FC = () => {
  const { history, loading, error, loadHistory, handleClearHistory } =
    useHistoryController();

  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  const handleClear = (): void => {
    Alert.alert(
      'Limpar histórico',
      'Tem certeza que deseja remover todas as consultas do histórico?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: () => void handleClearHistory(),
        },
      ],
    );
  };

  if (loading) {
    return <LoadingIndicator message="Carregando histórico..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={handleClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.clearButton}>Limpar tudo</Text>
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {history.length === 0 ? (
        <EmptySearch message="Nenhuma consulta no histórico." />
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => `${item.cep}-${item.localidade}`}
          renderItem={({ item }) => <AddressCard address={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.basePadding,
    paddingTop: metrics.basePadding,
    paddingBottom: metrics.smallPadding,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  clearButton: {
    fontSize: 14,
    color: colors.error,
    fontWeight: '600',
  },
  errorContainer: {
    margin: metrics.basePadding,
    backgroundColor: colors.errorLight,
    borderRadius: metrics.borderRadius,
    padding: metrics.basePadding,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
  },
  list: {
    padding: metrics.basePadding,
    paddingBottom: 32,
  },
});
