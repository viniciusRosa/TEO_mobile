import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { useForm, Controller } from 'react-hook-form';

import { StyledInput } from '../components/StyledInput';

interface FormData {
  email: string;
  password: string;
}

export function Login() {
  const navigation = useNavigation();

  const [name, setsName] = useState('');

  const { control, handleSubmit, formState: {errors} } = useForm<FormData>();

  const onSubmit = (data: FormData) => {

    if (data.email === undefined || data.password === undefined) {

       return Alert.alert('Campos vazios')

    }

      navigation.navigate('Dashboard')

    // navigation.navigate('Confirmation', {
      //   title: 'Login efetuado com sucesso',
      //   icon: 'verified',
      //   text: '',
      //   nextScreen: 'Dashboard'
      // })

  };

  return (
      <View style={[styles.container, styles.androidSafeArea]}>

        <View style={styles.header}>
          <Text style={styles.title}>
            Fazer Login
          </Text>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <ScrollView style={[styles.body]}>

            <Controller
              control={control}
              render={({ field: {onChange, onBlur, value} }) => (
                <StyledInput
                  ask=''
                  placeholder='Email'
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
              )}
              name='email'
              rules={{required: false}}
            />

            <Controller
              control={control}
              render={({ field: {onChange, onBlur, value} }) => (
                <StyledInput
                  secureTextEntry={true}
                  ask=''
                  placeholder='Senha'
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
              )}
              name='password'
              rules={{required: false}}
            />



            <View style={styles.submitButton}>
              <Button
                color={colors.green}
                title='Entrar'
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

