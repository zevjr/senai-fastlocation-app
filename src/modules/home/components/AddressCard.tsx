import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Address } from '../model/Address';
import { colors } from '../../../shared/colors';
import { metrics } from '../../../shared/metrics';

interface AddressCardProps {
  address: Address;
  onPress?: () => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({ address, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.cepRow}>
        <Text style={styles.cepBadge}>CEP</Text>
        <Text style={styles.cepValue}>{address.cep}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.street}>
        {address.logradouro || 'Logradouro não informado'}
      </Text>

      {Boolean(address.complemento) && (
        <Text style={styles.complement}>{address.complemento}</Text>
      )}

      <Text style={styles.district}>
        {address.bairro || 'Bairro não informado'}
      </Text>

      <Text style={styles.city}>
        {address.localidade} — {address.uf}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: metrics.borderRadiusLarge,
    padding: metrics.basePadding,
    marginBottom: metrics.smallMargin,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.smallPadding,
  },
  cepBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
    overflow: 'hidden',
  },
  cepValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: metrics.smallPadding,
  },
  street: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  complement: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 4,
  },
  district: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 4,
  },
  city: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});
