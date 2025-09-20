import { GlobalContextProvider } from './context/context';
import React from 'react'
import useNotifications from './Notifications/useNotifications';
import AppNavigator from './AppNavigator';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const navRef = useNotifications();
  return (
    <GlobalContextProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style='dark' />
        <AppNavigator navRef={navRef} />
      </View>
    </GlobalContextProvider >
  );
}
