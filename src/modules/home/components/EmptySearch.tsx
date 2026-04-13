import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../shared/colors';
import { metrics } from '../../../shared/metrics';

interface EmptySearchProps {
  message?: string;
}

export const EmptySearch: React.FC<EmptySearchProps> = ({
  message = 'Nenhum resultado encontrado.',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.hint}>Verifique os dados e tente novamente.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: metrics.largePadding * 2,
  },
  icon: {
    fontSize: 48,
    marginBottom: metrics.baseMargin,
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: metrics.smallMargin,
  },
  hint: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
});
