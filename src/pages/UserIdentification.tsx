import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { BottonButton } from '../components/BottonButton';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { checkEmail } from '../libs/storage'
import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

export function UserIdentification() {

  const {  } = useContext(DataContext);

  const [email, setEmail] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const navigation = useNavigation();


  // DATA

  useEffect(() => {
    async function data() {
      const emailSaved = await AsyncStorage.getItem('@teoapp:userEmail');
      console.log(emailSaved)
      setEmail(emailSaved || '')
    }

    data()
  }, [])

  async function handleSubmit() {

    const result =  /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)

    if (!result) {
      return Alert.alert('Precisamos de um email válido!');
    }

    if (!email) {
      return Alert.alert('Precisamos do seu email!');
    }

    try {
      await checkEmail(email)
      navigation.navigate('Begin')
    } catch (err) {
      Alert.alert('Algo deu errado.')
      console.log(err)
    }


  }

  function handleLogin() {

    navigation.navigate('Login')
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleIsfilled() {
    setIsFocused(false);
    setIsFilled(!!email);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value)
    setEmail(value);
  }


  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.header}>

            <Text style={styles.title}>
              Por favor, digite seu email?
            </Text>

            <TextInput
              value={email}
              style={[
                styles.input,
                (isFocused || isFilled) && {borderColor: colors.green}
              ]}
              placeholder='Email'
              onChangeText={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleIsfilled}
            />
          </View>

          <View style={styles.footer}>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>
                Eu já tenho cadastro.
            </Text>
            </TouchableOpacity>

            <BottonButton text={'Confirmar'}  onPress={handleSubmit}/>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    width: '100%',

  },

  header: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 54,
    paddingVertical: 64,
  },

  title: {
    width: '100%',
    fontSize: 16,
    marginTop: 36,
    color: colors.gray_medium,
    fontFamily: fonts.text_medium,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray_medium,
    borderRadius: 5,
    marginTop: 16,
    width: '100%',
    padding: 10,
    textAlign: 'left'
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

  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  loginButtonText: {
    color: colors.gray_medium,
    fontFamily: fonts.text_medium,
    fontWeight: 'bold'
  }

})

