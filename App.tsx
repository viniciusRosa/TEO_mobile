import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading'
// import {
//   useFonts,
//   Jost_400Regular,
//   Jost_600SemiBold
// } from '@expo-google-fonts/jost';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold
} from '@expo-google-fonts/inter';

import Routes from './src/routes';


export default function App() {
  const [ fontsLoaded ] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold
  })

if (!fontsLoaded) {
  return <AppLoading />
}

  return (
    <>
      <StatusBar style="auto" />
      <Routes />
    </>
  );
}

