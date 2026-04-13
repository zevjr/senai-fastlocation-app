import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Address } from '../model/Address';
import { openAddressInMaps } from '../service/mapService';
import { colors } from '../../../shared/colors';
import { metrics } from '../../../shared/metrics';

interface LastAddressProps {
  address: Address;
}

export const LastAddress: React.FC<LastAddressProps> = ({ address }) => {
  const handleOpenMaps = async (): Promise<void> => {
    try {
      await openAddressInMaps(address);
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir o mapa. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>ÚLTIMO ENDEREÇO CONSULTADO</Text>
      <View style={styles.card}>
        <Text style={styles.street}>
          {address.logradouro || 'Logradouro não informado'}
        </Text>
        <Text style={styles.details}>
          {address.bairro} — {address.localidade}/{address.uf}
        </Text>
        <Text style={styles.cep}>CEP: {address.cep}</Text>

        <TouchableOpacity
          style={styles.mapButton}
          onPress={handleOpenMaps}
          activeOpacity={0.8}
        >
          <Text style={styles.mapButtonText}>🗺️  Traçar Rota</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: metrics.baseMargin,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: 1,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: metrics.borderRadiusLarge,
    padding: metrics.basePadding,
  },
  street: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 6,
  },
  details: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 4,
  },
  cep: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: metrics.baseMargin,
  },
  mapButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: metrics.borderRadius,
    paddingVertical: 12,
    alignItems: 'center',
  },
  mapButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
});
