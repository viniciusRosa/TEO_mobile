import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface InputProps extends TextInputProps{
  ask: string;
}

export function StyledInput({ask, ...rest}: InputProps) {

  return (

    <View style={styles.InputWrapper}>

      <Text style={styles.title}>
        {ask}
      </Text>

      <TextInput
        style={[styles.input]}
        {...rest}
      />

    </View>

  )
}

const styles = StyleSheet.create({

  InputWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    width: '100%',
    fontSize: 16,
    marginTop: 36,
    color: colors.gray,
    fontFamily: fonts.title,
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

})

