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

interface FormData {
  order: string;

}

export function OrderTransport() {
  const navigation = useNavigation();

  const [routeSelected, setRouteSelected] = useState('')

  const { createUser, orderTransport } = useData();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();


  useEffect(() => {
    //createUser() ->
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

  function handleButton() {
    navigation.navigate('UserForm');
  }

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
    // { latitude: 37.7734153, longitude: -122.4577787 },
    // { latitude: 37.7948605, longitude: -122.4596065 },
    // { latitude: 37.8025259, longitude: -122.4351431 }
  ]


  return (
    <View style={[styles.container, styles.androidSafeArea]}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Transporte
        </Text>
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Me candidatar a uma vaga
        </Text>

      </View>

      <View style={styles.mapContainer}>
        <MapView style={styles.map}>

        {coordinates.map(point => (

<Marker key={String(point.latitude)}  coordinate={{
    latitude: point.latitude,
    longitude: point.longitude,
}}
>

</Marker>

))}

        </MapView>
      </View>


      <ScrollView style={[styles.body, styles.routesWrapper]}>

        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <RouteItem
              data={item}
              active={item.id === routeSelected}
              onPress={() => { handleRoteSelected(item.id) }}
            />
          )}
          contentContainerStyle={styles.routeList}
        />

      </ScrollView>

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
    // width: '86%',
    // marginTop: 64
  },

  wrapper: {
    marginTop: 56
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

  camera: {
    borderRadius: 190 / 2,
    borderWidth: 2,
    borderColor: colors.gray_medium,
    marginBottom: 10
  },

  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 160 / 2,
    margin: 10,
    resizeMode: 'cover',
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
    width: '90%',
    marginVertical: 16
  },

  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },

  // routes list

  routesWrapper: {
    borderWidth: 0.5,
    borderColor: colors.gray_medium,
    borderRadius: 12,
    marginBottom: 16,
    width: '90%'
  },

  routeList: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
    // marginVertical: 32,
    // marginBottom: 32,
  },

  // map view

  mapContainer: {
    flex: 1,
    width: '90%',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 16,

},

map: {
    width: '100%',
    height: '100%',
},

})

// https://www.google.com.br/maps/dir/-29.8928138,-50.2610572/-29.8878367,-50.270051/-29.8959559,-50.2725517/-29.9038089,-50.257088/-29.8936994,-50.2394043/@-29.8955439,-50.2740386,14.29z/data=!4m2!4m1!3e0
