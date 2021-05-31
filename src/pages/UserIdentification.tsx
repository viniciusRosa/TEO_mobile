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

export function UserIdentification() {

  const [name, setName] = useState<string>();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const navigation = useNavigation();

  async function handleSubmit() {

    if (!name) {
      return Alert.alert('Me diz como chamar você?');
    }

    await AsyncStorage.setItem('@teoapp:username', name);

    navigation.navigate('Begin')
  }

  function handleLogin() {

    navigation.navigate('')
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleIsfilled() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value)
    setName(value);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.header}>

            <Text style={styles.title}>
              Como podemos {'\n'}
          te chamar?
          </Text>

            <TextInput
              style={[
                styles.input,
                (isFocused || isFilled) && {borderColor: colors.green}
              ]}
              placeholder='Digite seu nome'
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
    fontSize: 24,
    marginTop: 54,
    color: colors.gray_medium,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  input: {
    borderWidth: 1,
    borderColor: colors.gray_medium,
    borderRadius: 5,
    marginTop: 24,
    width: '100%',
    padding: 10,
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

