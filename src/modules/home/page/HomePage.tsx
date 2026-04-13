import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useHomeController } from '../controller/useHomeController';
import { AddressCard } from '../components/AddressCard';
import { LastAddress } from '../components/LastAddress';
import { EmptySearch } from '../components/EmptySearch';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { colors } from '../../../shared/colors';
import { metrics } from '../../../shared/metrics';

type SearchMode = 'cep' | 'address';

export const HomePage: React.FC = () => {
  const [searchMode, setSearchMode] = useState<SearchMode>('cep');
  const [cepInput, setCepInput] = useState('');
  const [ufInput, setUfInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [streetInput, setStreetInput] = useState('');

  const { loading, error, results, lastAddress, handleSearchByCep, handleSearchByAddress } =
    useHomeController();

  const handleSearch = async (): Promise<void> => {
    if (searchMode === 'cep') {
      await handleSearchByCep(cepInput.trim());
    } else {
      await handleSearchByAddress({
        uf: ufInput.trim().toUpperCase(),
        city: cityInput.trim(),
        street: streetInput.trim(),
      });
    }
  };

  const isSearchDisabled = (): boolean => {
    if (loading) return true;
    if (searchMode === 'cep') return cepInput.trim().length === 0;
    return !ufInput.trim() || !cityInput.trim() || !streetInput.trim();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>FastLocation</Text>
        <Text style={styles.subtitle}>Consulte endereços rapidamente</Text>

        <View style={styles.modeToggle}>
          <TouchableOpacity
            style={[styles.modeTab, searchMode === 'cep' && styles.modeTabActive]}
            onPress={() => setSearchMode('cep')}
          >
            <Text
              style={[
                styles.modeTabText,
                searchMode === 'cep' && styles.modeTabTextActive,
              ]}
            >
              Por CEP
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeTab, searchMode === 'address' && styles.modeTabActive]}
            onPress={() => setSearchMode('address')}
          >
            <Text
              style={[
                styles.modeTabText,
                searchMode === 'address' && styles.modeTabTextActive,
              ]}
            >
              Por Endereço
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          {searchMode === 'cep' ? (
            <Input
              label="CEP"
              placeholder="Ex: 01310100"
              value={cepInput}
              onChangeText={setCepInput}
              keyboardType="numeric"
              maxLength={9}
            />
          ) : (
            <>
              <Input
                label="UF"
                placeholder="Ex: SP"
                value={ufInput}
                onChangeText={setUfInput}
                maxLength={2}
                autoCapitalize="characters"
              />
              <Input
                label="Cidade"
                placeholder="Ex: São Paulo"
                value={cityInput}
                onChangeText={setCityInput}
              />
              <Input
                label="Logradouro"
                placeholder="Ex: Avenida Paulista"
                value={streetInput}
                onChangeText={setStreetInput}
              />
            </>
          )}

          <Button
            title="Buscar"
            onPress={handleSearch}
            loading={loading}
            disabled={isSearchDisabled()}
          />
        </View>

        {loading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.loadingText}>Buscando endereço...</Text>
          </View>
        )}

        {!loading && error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && !error && results.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>
              {results.length === 1
                ? 'Endereço encontrado'
                : `${results.length} endereços encontrados`}
            </Text>
            {results.map((address) => (
              <AddressCard key={address.cep} address={address} />
            ))}
          </View>
        )}

        {!loading && !error && results.length === 0 && cepInput.length > 0 && (
          <EmptySearch />
        )}

        {lastAddress && (
          <LastAddress address={lastAddress} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: metrics.basePadding,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: metrics.largePadding,
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: colors.border,
    borderRadius: metrics.borderRadius,
    padding: 4,
    marginBottom: metrics.baseMargin,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  modeTabActive: {
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  modeTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
  },
  modeTabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  searchContainer: {
    marginBottom: metrics.baseMargin,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: metrics.baseMargin,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 8,
  },
  errorContainer: {
    backgroundColor: colors.errorLight,
    borderRadius: metrics.borderRadius,
    padding: metrics.basePadding,
    marginBottom: metrics.baseMargin,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
  },
  resultsContainer: {
    marginBottom: metrics.baseMargin,
  },
  resultsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: metrics.smallMargin,
  },
});
