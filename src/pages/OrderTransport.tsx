import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Button
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useData } from '../contexts/DataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteItem } from '../components/RouteItem';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions';
import { googleApiKey } from '../../keys';

export function OrderTransport() {
  const navigation = useNavigation();
  const GOOGLE_MAPS_APIKEY = googleApiKey;

  const [routes, setRoutes] = useState([])
  const [routeSelected, setRouteSelected] = useState('')
  const [inicialPosition, setInicialPosition] = useState <[number, number]> ([0, 0])
  const [currentRoute, setCurrentRoute] = useState()

  const { orderTransport, loadRoutes } = useData();

  const { handleSubmit, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    async function getRoutes() {
      const response = await loadRoutes();
      setRoutes(response);
    }
    getRoutes();
    setCurrentRoute(routes[0])

  }, [])

  async function loadPosition() {
     await Location.requestForegroundPermissionsAsync();
     const { status } = await Location.getForegroundPermissionsAsync();

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
}

  useEffect(() => {

    loadPosition();

  }, [])

  function handleRoteSelected(item: object) {
    setCurrentRoute(item)
    setRouteSelected(item.id)
  }

  const onSubmit = async () => {

    try {
      const userSaved = await AsyncStorage.getItem('@teoapp:student');
      const userId =  userSaved ? (JSON.parse(userSaved)) : {};
      if (userId) {
        orderTransport(userId[0].id, routeSelected)
      }

      navigation.navigate('Confirmation', {
        title: `Pedido feito`,
        icon: 'verified',
        text: 'Acompanhe o status do seu pedido na aba Transporte',
        nextScreen: 'Dashboard'
      })
    } catch (err) {
      Alert.alert('Algo deu errado')
    }

  };

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
          }}
          >

            <Marker
              coordinate={{latitude: -29.890794, longitude: -50.256579}}
              title={"Minha casa"}
              description={''}
            />

            {routeSelected !== ''  ? (

              <MapViewDirections
                origin={{
                  latitude: currentRoute.points[0].latitude,
                  longitude: currentRoute.points[0].longitude
                }}
                waypoints={[{latitude: -29.890794, longitude: -50.256579}]}
                destination={{
                  latitude: currentRoute.points[currentRoute.points.length -1].latitude,
                  longitude: currentRoute.points[currentRoute.points.length -1].longitude
                }}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={10}
                strokeColor={colors.green}
              />
               ) : <></>}

        </MapView>
      )}
      </View>

      <View style={[styles.body]}>

        <FlatList
          data={routes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <RouteItem
              data={item}
              active={item.id === routeSelected}
              onPress={() => { handleRoteSelected(item) }}
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
