import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/core';

export function Dashboard() {

  const navigation = useNavigation();

  function handleButton() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 56,
    paddingHorizontal:20
  },

  header: {
    marginTop: 56,
    marginRight: 56,
  },

  title: {
    fontFamily: fonts.title,
    fontSize: 48,
    color: colors.gray_medium,
    fontWeight: 'bold',
    textAlign: 'left'
  },

  subtitle: {
    textAlign: 'left',
    fontSize: 24,
    fontFamily: fonts.text_medium,
    color: colors.gray
  },


  body: {
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 88,

  },


  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },

})

