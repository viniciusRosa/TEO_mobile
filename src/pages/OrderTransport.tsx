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
import { useData } from '../contexts/DataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteItem } from '../components/RouteItem';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { googleApiKey } from '../../keys';
import { Student } from '../types/Student';
import { Route, Point } from '../types/Route';

type WayPoint = {
  latitude: number;
  longitude: number;
}

export function OrderTransport() {
  const navigation = useNavigation();
  const GOOGLE_MAPS_APIKEY = googleApiKey;

  const [student, setStudent] = useState<Student>();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [routeSelected, setRouteSelected] = useState<Route>();
  const [waypoint, setWaypoint] = useState<WayPoint[]>([]);

  const { orderTransport, loadRoutes } = useData();

  const { handleSubmit, formState: { errors } } = useForm<FormData>();

  useEffect(() => {

    async function getRoutes() {
      const response = await loadRoutes();
      setRoutes(response);
    };

    async function getStudent() {
      const studentSaved = await AsyncStorage.getItem('@teoapp:student');
      const studentParse =  studentSaved ? (JSON.parse(studentSaved)) : {};

      setStudent(studentParse[0])
    }

    getRoutes();
    getStudent();

  }, [])

  useEffect(() => {
    if (routeSelected) {
      if(routeSelected.points.length > 2) {
        const filteredPoints = routeSelected.points.slice(1, routeSelected.points.length -1);
        let wapPointsFormated: WayPoint[] = [];

        filteredPoints.map( point => {
          wapPointsFormated.push({latitude: Number(point.latitude), longitude: Number(point.longitude)})
        } )

        setWaypoint(wapPointsFormated)
      }
    }
  }, [routeSelected])

  function handleRoteSelected(item: Route) {
    setRouteSelected(item)
  }

  const onSubmit = async () => {

    try {
      if (student && routeSelected) {
        orderTransport(student.id, routeSelected.id)
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
      {student?.latitude && (
        <MapView style={styles.map}
        initialRegion={{
          latitude: Number(student?.latitude),
          longitude: Number(student?.longitude),
          latitudeDelta: 0.050,
          longitudeDelta: 0.050
          }}
          >

            <Marker
              coordinate={{latitude: Number(student?.latitude), longitude: Number(student?.longitude)}}
              title={"Minha casa"}
              description={''}
            />

            {routeSelected ? (
              <>

              <MapViewDirections
                origin={{
                  latitude: Number(routeSelected.points[0].latitude),
                  longitude: Number(routeSelected.points[0].longitude)
                }}
                waypoints={waypoint}
                destination={{
                  latitude: Number(routeSelected.points[routeSelected.points.length -1].latitude),
                  longitude: Number(routeSelected.points[routeSelected.points.length -1].longitude)
                }}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={6}
                strokeColor={colors.green}
              />

              <Marker
                coordinate={{latitude: Number(routeSelected.points[0].latitude), longitude: Number(routeSelected.points[0].longitude)}}
                title={"Início"}
                pinColor={colors.green}
                description={''}
              />

              <Marker
                coordinate={{latitude: Number(routeSelected.points[routeSelected.points.length -1].latitude),
                            longitude: Number(routeSelected.points[routeSelected.points.length -1].longitude)}}
                title={"Final"}
                pinColor={colors.green}
                description={''}
              />
              </>

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
              active={item === routeSelected}
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
    marginBottom:36
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
    marginHorizontal: 10,
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
