import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { FontAwesome5 } from '@expo/vector-icons/';
import { useNavigation } from '@react-navigation/core';
import { useEffect } from 'react';
import { loadSchool } from '../libs/storage';
import { useIsFocused } from '@react-navigation/native';


export function SchoolScreen() {

  const isFocused = useIsFocused();

  const [school, setSchool] = useState({});

  const navigation = useNavigation();

  async function getSchoolData() {
    const data = await loadSchool();
    await setSchool(data)
  }

  useEffect(() => {
    if (isFocused === true) {
      getSchoolData();

    }
  }, [isFocused])

  function handleUserEdit() {
    navigation.navigate('UserSchoolForm')
  }

  return (
    <View style={[styles.container, styles.androidSafeArea]}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Escola
        </Text>
      </View>

      <ScrollView style={[styles.body]}>

        <View style={styles.schooldata}>
          <View style={styles.dataWrapper}>
            <Text style={styles.dataTitle}>Escola</Text>
            <Text style={styles.dataText}>{school.name}</Text>
          </View>

          <View style={styles.dataWrapper}>
            <Text style={styles.dataTitle}>Endereço</Text>
            <Text style={styles.dataText}>{school.address}</Text>
          </View>

          <View style={styles.dataWrapper}>
            <Text style={styles.dataTitle}>Numero</Text>
            <Text style={styles.dataText}>{school.number}</Text>
          </View>

          <View style={styles.dataWrapper}>
            <Text style={styles.dataTitle}>Contatos</Text>
            <Text style={styles.dataText}>{school.phone}</Text>
          </View>

          <View style={styles.dataWrapper}>
            <Text style={styles.dataTitle}>Email</Text>
            <Text style={styles.dataText}>{school.email}</Text>
          </View>
        </View>

        <View>

        </View>

        <View style={styles.menuItens}>

          <TouchableOpacity style={styles.menuItem} onPress={handleUserEdit}>
            <FontAwesome5 name="edit" size={24} color={colors.gray} />
            <Text style={styles.menuText}>Editar dados Escolares</Text>
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

  dataTitle: {
    fontFamily: fonts.title,
    fontSize: 10,
    color: colors.gray_medium,
  },

  dataText: {
    fontFamily: fonts.text_medium,
    fontSize: 16,
    color: colors.gray,
  },

  schooldata: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.gray_medium,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  dataWrapper: {
    marginBottom: 16
  },

})

