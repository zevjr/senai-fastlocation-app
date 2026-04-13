import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Address } from '../model/Address';
import { AddressCard } from './AddressCard';
import { EmptySearch } from './EmptySearch';
import { colors } from '../../../shared/colors';
import { metrics } from '../../../shared/metrics';

interface AddressListProps {
  addresses: Address[];
  title?: string;
  onAddressPress?: (address: Address) => void;
}

export const AddressList: React.FC<AddressListProps> = ({
  addresses,
  title,
  onAddressPress,
}) => {
  if (addresses.length === 0) {
    return <EmptySearch />;
  }

  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.cep}
        renderItem={({ item }) => (
          <AddressCard
            address={item}
            onPress={onAddressPress ? () => onAddressPress(item) : undefined}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: metrics.baseMargin,
  },
});
