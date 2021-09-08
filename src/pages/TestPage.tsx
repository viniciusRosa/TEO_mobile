import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons/'
import { useNavigation } from '@react-navigation/core';
import unknownUser from '../assets/images/unknownUser.png'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function TestPage() {
  const navigation = useNavigation();

  const [pickedImagePath, setPicketImagePath] = useState('');
  const [name, setsName] = useState('');




  return (
    <View style={[styles.container, styles.androidSafeArea]}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Menu de teste
        </Text>
      </View>

      <ScrollView style={[styles.body]}>

        <View style={styles.menuItens}>

          <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('OrderTransport')}}>
            <FontAwesome5 name="bug" size={24} color={colors.gray} />
            <Text style={styles.menuText}>OrderTransport</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
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

  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 160 / 2,
    margin: 10,
    resizeMode: 'cover',
  },

  menuItens: {
    marginTop: 24
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24
  },

  menuText: {
    fontFamily: fonts.title,
    color: colors.gray,
    marginLeft: 8
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

