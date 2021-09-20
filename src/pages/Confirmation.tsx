import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { BottonButton } from '../components/BottonButton';
import { useNavigation, useRoute } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons'

interface Params {
  title: string;
  icon: string;
  nextScreen: string;
  text: string;
}

export function Confirmation() {

  const navigation = useNavigation();
  const route = useRoute();

  const {
    title,
    icon,
    nextScreen,
    text
  } = route.params as Params;

  function handleButton() {
    navigation.navigate(nextScreen);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <View style={styles.body}>
          <MaterialIcons
            name={icon}
            size={80}
            color={colors.green}
          />
          <Text style={styles.title}>
            {title}
          </Text>
          <View style={styles.textView}>
            <Text style={styles.textBody}>
              {text}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <BottonButton text={'Ok'} onPress={handleButton} />
        </View>

      </View>
    </View>
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    width: '100%',
    fontSize: 24,
    color: colors.gray,
    fontFamily: fonts.text_medium,
    fontWeight: 'bold',
  },

  textView: {
    marginTop: 24,
    width: '60%'
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

