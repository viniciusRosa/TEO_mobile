import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { BottonButton } from '../components/BottonButton';
import { useNavigation } from '@react-navigation/core';

export function Begin() {

  const navigation = useNavigation();

  function handleButton() {
    navigation.navigate('Dashboard');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Olá Vinicius,
          </Text>
          <Text style={styles.subtitle}>
            Vamos Começar?
          </Text>
        </View>


        <View style={styles.footer}>
          <BottonButton text={ 'Começar' } onPress={handleButton}/>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 56,
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
    textAlign: 'left',
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

