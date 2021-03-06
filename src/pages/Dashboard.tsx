import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Image
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { useEffect } from 'react';
import unknownUser from '../assets/images/unknownUser.png'
import { getData, userImageLoad, loadVacancy, saveSchool } from '../libs/storage';
import { useData } from '../contexts/DataContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons/';
import { useIsFocused } from '@react-navigation/native';


export function Dashboard() {

  const {
    getSchool,
    updateVacancyRequest
  } = useData()

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [pickedImagePath, setPicketImagePath] = useState('');
  const [name, setsName] = useState('');
  const [school, setSchool] = useState('');
  const [shift, setShift] = useState('');
  const [serie, setserie] = useState('');
  const [userclass, setuserclass] = useState('');
  const [updateInfo, setUpudateInfo] = useState(false)
  const [vacancy, setVancancy] = useState({})

  useEffect(() => {
    async function initializeData() {

      const data = await getData();
      const image = await userImageLoad();
      const school = await getSchool(data[0].school_id);
      await saveSchool(school)

      setPicketImagePath(image.uri || '')
      setsName(data[0].name || '')
      setSchool(school.name || '')
      setShift(data[0].shift || '')
      setserie(data[0].series || '')
      setuserclass(data[0].classe || '')
    }
    initializeData()
  }, [school, pickedImagePath, isFocused])

  useEffect(() => {

    async function getStatus() {
      const data = await loadVacancy()
      await setVancancy(data)
      setUpudateInfo(false)
    }

    getStatus()

  }, [updateInfo, isFocused])

  async function updateVacancy() {
    const dataVacancy = await updateVacancyRequest();
    setUpudateInfo(true)
  }

  return (
    <View style={[styles.container, styles.androidSafeArea]}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Carteira digital
        </Text>
      </View>

      <ScrollView style={styles.body}>
        <View>

          <View style={styles.userdata}>
            <View style={styles.ImageView}>

              <Image source={pickedImagePath != ''
                ? { uri: String(pickedImagePath) }
                : unknownUser} style={styles.thumbnail} />

              <Text style={styles.bodyTextTitle}> {name} </Text>
            </View>
          </View>

          <View style={styles.schooldata}>

            <View style={styles.dataWrapper}>
              <Text style={styles.dataTitle}>Escola</Text>
              <Text style={styles.dataText}>{school}</Text>
            </View>
              <View style={styles.dataWrapper}>
                <Text style={styles.dataTitle}>Turno</Text>
                <Text style={styles.dataText}>{shift}</Text>
              </View>
              <View style={styles.dataWrapper}>
                <Text style={styles.dataTitle}>S??rie</Text>
                <Text style={styles.dataText}>{serie}</Text>
              </View>

            <View style={styles.dataWrapper}>
              <Text style={styles.dataTitle}>Turma</Text>
              <Text style={styles.dataText}>{userclass === '' ? '-' : userclass}</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity onPress={updateVacancy}>
              <View style={styles.schooldata}>
                <View style={styles.dataWrapper}>
                  <Text style={styles.dataTitle}>Status do pedido</Text>
                  <View style={styles.statusButton}>
                    <View>
                    {
                      vacancy.status === 'in_progress' &&
                      <Text style={[styles.dataText, { color: colors.color_secondary, fontWeight: 'bold' }]}>Pedido em an??lise</Text>
                    }
                    {
                      vacancy.status === 'rejected' &&
                      <Text style={[styles.dataText, { color: colors.color_warning, fontWeight: 'bold' }]}>Pedido indeferido</Text>
                    }
                    {
                      vacancy.status === 'accepted' &&
                      <Text style={[styles.dataText, { color: colors.green, fontWeight: 'bold' }]}>Pedido deferido</Text>
                    }
                    </View>
                    <View style={styles.buttonIcon}>
                     <FontAwesome5 name="sync-alt" size={36} color={colors.gray_medium} />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

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

  androidSafeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'android' ? 25 : 0
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

  userdata: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },

  ImageView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: 160 / 2,
    margin: 10,
    resizeMode: 'cover',
  },

  bodyTextTitle: {
    fontFamily: fonts.title,
    fontSize: 16,
    color: colors.gray,
    marginBottom: 8,
    marginLeft: 16

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

  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 132
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
  statusButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonIcon: {
    marginRight: 20
  }
})

