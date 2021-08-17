import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { BottonButton } from '../components/BottonButton';
import { useNavigation } from '@react-navigation/core';

export function Begin() {

  const navigation = useNavigation();

  function handleButton() {
    navigation.navigate('UserForm');
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Ok, {'\n'}Vamos Começar?
        </Text>
      </View>

      <View>
        <View style={styles.bodyText}>
          <Text style={styles.bodyTextTitle}>O primeiro passo: </Text>
          <Text style={styles.bodyTextStep}>Precisamos de alguns dados pessoais.</Text>
        </View>

        <View style={styles.bodyText}>
          <Text style={styles.bodyTextTitle}>O segundo passo:  </Text>
          <Text style={styles.bodyTextStep}>Nos informe seus dados escolares.</Text>
        </View>

        <View style={styles.bodyText}>
          <Text style={styles.bodyTextTitle}>E por fim: </Text>
          <Text style={styles.bodyTextStep}>Realize  o pedido da sua vaga.</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <BottonButton text={'Começar'} onPress={handleButton} />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  header: {
    width: '100%',
    marginVertical: 40,
    marginLeft: 32

  },

  title: {
    fontFamily: fonts.title,
    fontSize: 32,
    color: colors.gray_medium,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 16

  },

  bodyText: {
    marginVertical: 16,
    marginHorizontal: 8
  },

  bodyTextTitle: {
    fontFamily: fonts.title,
    fontSize: 16,
    color: colors.gray,
    marginBottom: 8

  },

  bodyTextStep: {
    marginLeft: 24,
    fontFamily: fonts.text_medium,
    fontSize: 16,
    color: colors.gray_medium
  },

  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  }


})

