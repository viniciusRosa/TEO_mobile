import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  ScrollView,
  Button
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { useForm, Controller } from 'react-hook-form';
import { Alert } from 'react-native';
import { useData } from '../contexts/DataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteItem } from '../components/RouteItem';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions';
import { googleApiKey } from '../../keys'

interface FormData {
  order: string;

}

export function OrderTransport() {
  const navigation = useNavigation();

  const [routeSelected, setRouteSelected] = useState('')
  const [inicialPosition, setInicialPosition] = useState <[number, number]> ([0, 0])

  const { createUser, orderTransport } = useData();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  async function loadPosition() {
     await Location.requestForegroundPermissionsAsync();
     const { status } = await Location.getForegroundPermissionsAsync();
    console.log(status)


    if (status !== 'granted') {
      Alert.alert('Oooops...', 'Precesamos de sua permissão');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;


     setInicialPosition([
        latitude,
        longitude
    ])

    console.log(Number(inicialPosition[0]), inicialPosition[1])

}

const GOOGLE_MAPS_APIKEY = googleApiKey;

  useEffect(() => {

    loadPosition();

  }, [])

  function handleRoteSelected(id: string) {
    console.log(id)
    setRouteSelected(id)

  }


  const onSubmit = async (data: FormData) => {

    try {
      const response = await createUser();
      await AsyncStorage.setItem('@teoapp:userId', response[0].id)
      console.log(response[0])
      if (response[0].id) {
        orderTransport(response[0].id)
      }

      navigation.navigate('Confirmation', {
        title: `Pedido feito`,
        icon: 'verified',
        text: 'Acompanhe o status do seu pedido na aba Transporte',
        nextScreen: 'Dashboard'
      })
    } catch (err) {
      Alert.alert('ALgo deu errado')
    }

  };

  const data = [
    {
      "id": "asdadqwdqwd",
      "name": "Rota 1",
      "shift": "Manha",
      "path": [
        {
          "id": "asdasdasd",
          "street": "Rua 1"
        },
        {
          "id": "asdasdasqwe",
          "street": "Rua 2"
        }
      ]
    },
    {
      "id": "dasdasd",
      "name": "Rota 2",
      "shift": "Noite",
      "path": [
        {
          "id": "asdasdasd",
          "street": "Rua 1"
        },
        {
          "id": "asdasdasqwe",
          "street": "Rua 2"
        }
      ]
    },
    {
      "id": "zxczxxc",
      "name": "Rota 2",
      "shift": "Noite",
      "path": [
        {
          "id": "asdasdasd",
          "street": "Rua 1"
        },
        {
          "id": "asdasdasqwe",
          "street": "Rua 2"
        }
      ]
    }
  ]

  const coordinates = [
    { latitude: -29.8928138, longitude: -50.2610572 },
    { latitude: -29.8878367, longitude: -50.270051 },
    { latitude: -29.8959559, longitude: -50.2725517 },
  ]

  const initial = { latitude: inicialPosition[0],
    longitude: inicialPosition[1], latitudeDelta: 0.9, longitudeDelta: 0.9 }

  return (
    <View style={[styles.container, styles.androidSafeArea]}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Transporte
        </Text>
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Escolha sua rota
        </Text>
      </View>

      <View style={styles.mapContainer}>
      { inicialPosition[0] !== 0 && (
        <MapView style={styles.map}
        loadingEnabled={inicialPosition[0] === 0}
        initialRegion={{
          latitude: Number(inicialPosition[0]),
          longitude: Number(inicialPosition[1]),
          latitudeDelta: 0.050,
          longitudeDelta: 0.050
          }}>

          <Marker coordinate={coordinates[0]}/>
          <Marker coordinate={coordinates[1]}/>

          <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates[1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={10}
            strokeColor={colors.green}
          />
        </MapView>
      )}
      </View>

      <View style={[styles.body]}>

        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <RouteItem
              data={item}
              active={item.id === routeSelected}
              // onPress={() => { handleRoteSelected(item.id) }}
              onPress={() => { loadPosition() }}

            />
          )}
          contentContainerStyle={styles.routeList}
        />
      </View>

      <View style={styles.submitButton}>
        <Button
          color={colors.green}
          title='realizar pedido'
          onPress={handleSubmit(onSubmit)}
        />
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
  },

  wrapper: {
    marginTop: 56
  },

  androidSafeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },

  submitButton: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },

  // routes list

  routeList: {
    justifyContent: 'center',
    margin: 10,
  },

  // map view

  mapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 10

  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapStyle: {
  color: 'red'
  }
})
