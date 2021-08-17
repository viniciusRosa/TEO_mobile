import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Button } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { useForm, Controller } from 'react-hook-form';
import { StyledInput } from '../components/StyledInput';
import { Alert } from 'react-native';
import { useData } from '../contexts/DataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormData {
  order: string;

}

export function OrderTransport() {
  const navigation = useNavigation();

  const { createUser, orderTransport } = useData();


  const [name, setsName] = useState('');

  const { control, handleSubmit, formState: {errors} } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {

    try {
      const response = await createUser();
      await AsyncStorage.setItem('@teoapp:userId', response[0].id )
      console.log(response[0])
      if(response[0].id) {
        orderTransport(response[0].id)
      }

      navigation.navigate('Confirmation', {
        title: `Pedido feito`,
        icon: 'verified',
        text: 'Acompanhe o status do seu pedido na aba Transporte',
        nextScreen: 'Dashboard'
      })
    } catch (err) {
      Alert.alert('ALgo deu errado')
    }

  };

  function handleButton() {
    navigation.navigate('UserForm');
  }

  return (
      <View style={[styles.container, styles.androidSafeArea]}>

        <View style={styles.header}>
          <Text style={styles.title}>
            Transporte
          </Text>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <ScrollView style={[styles.body]}>

            <View style={styles.wrapper}>
              <Text style={styles.title}>
                Me candidatar a uma vaga
              </Text>
            </View>

            <View style={styles.submitButton}>
              <Button
                color={colors.green}
                title='realizar pedido'
                onPress={handleSubmit(onSubmit)}
                />

            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    position: 'absolute',
    width: '100%',
    top: 0,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
    marginTop: 25,
    paddingTop: 10,
    zIndex: 100,
  },

  title: {
    fontFamily: fonts.title,
    fontSize: 16,
    color: colors.gray,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8
  },

  body: {
    flex: 1,
    width: '86%',
    marginTop: 64
  },

  wrapper: {
    marginTop: 48
  },

  androidSafeArea: {
    flex: 1,
        backgroundColor: colors.white,
        paddingTop: Platform.OS === 'android' ? 25 : 0
  },

  ImageView: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  camera: {
    borderRadius: 190 / 2,
    borderWidth: 2,
    borderColor: colors.gray_medium,
    marginBottom: 10
  },

  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 160 / 2,
    margin: 10,
    resizeMode: 'cover',
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

  submitButton: {
    marginVertical: 64
  },

  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
})

