import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { InitialPage } from '../modules/initial/page/InitialPage';
import { HomePage } from '../modules/home/page/HomePage';
import { HistoryPage } from '../modules/history/page/HistoryPage';
import { colors } from '../shared/colors';

export type RootStackParamList = {
  Initial: undefined;
  Home: undefined;
  History: undefined;
};

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const HistoryButton: React.FC<{ navigation: HomeNavigationProp }> = ({
  navigation,
}) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('History')}
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
  >
    <Text style={styles.historyButton}>Histórico</Text>
  </TouchableOpacity>
);

export const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Initial"
      screenOptions={{
        headerStyle: { backgroundColor: colors.white },
        headerTintColor: colors.primary,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Initial"
        component={InitialPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={({ navigation }) => ({
          title: 'FastLocation',
          headerRight: () => (
            <HistoryButton
              navigation={navigation as HomeNavigationProp}
            />
          ),
        })}
      />
      <Stack.Screen
        name="History"
        component={HistoryPage}
        options={{ title: 'Histórico de Consultas' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  historyButton: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 15,
  },
});
