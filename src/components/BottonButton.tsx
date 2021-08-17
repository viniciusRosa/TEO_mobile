import React from 'react';
import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
}

export function BottonButton({ text, ...rest }: ButtonProps) {
  return (

    <TouchableOpacity style={styles.button} {...rest} >
      <Text style={styles.textButton}>
        { text }
      </Text>
    </TouchableOpacity>

  )
}


const styles = StyleSheet.create({

  button: {
    height: 64,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green
  },

  textButton: {
    color: colors.white,
    fontFamily: fonts.text_medium,
    fontSize: 18
  }

})

