import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import UnknownUser from '../assets/images/unknownUser.png'


export function Header({ }) {
  return (

    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.name}>Vinicius</Text>
      </View>
      <Image source={UnknownUser} style={styles.image}/>
    </View>

  )
}


const styles = StyleSheet.create({

  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },

  greeting: {
    fontSize: 32,
    color: colors.gray_medium,
    fontFamily: fonts.text_medium
  },

  name: {
    fontSize: 32,
    fontFamily: fonts.text_medium,
    color: colors.gray,
    lineHeight: 40
  },

  image :{
    width: 70,
    height: 70,
    borderRadius: 40
  }

})

