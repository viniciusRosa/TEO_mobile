import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { BottonButton } from '../components/BottonButton';
import { useNavigation } from '@react-navigation/core';

export function Welcome() {

  const navigation = useNavigation();

  function handleButton() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Bem vindo {'\n'}
            ao {'\n'}
            TEO
          </Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.textBody}>
            Aqui você faz o pedido da sua vaga no transporte
            público escolar e fica sabendo os horários e por
            onde o ônibus passa.
          </Text>
        </View>

        <View style={styles.footer}>
          <BottonButton text={ 'Prosseguir' } onPress={handleButton}/>
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
    justifyContent: 'center',

  },

  header: {
    marginBottom: 64,

  },

  title: {
    fontFamily: fonts.title,
    fontSize: 56,
    color: colors.green,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  body: {
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 88,

  },

  textBody: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.text_medium,
    color: colors.gray
  },

  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },

})

