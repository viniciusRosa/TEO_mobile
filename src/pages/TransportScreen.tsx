import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
  Button,
  TextInput
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { useEffect } from 'react';
import { loadVacancy } from '../libs/storage';
import { Messages } from '../components/Messages'
import { useData } from '../contexts/DataContext'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons/'
import MapView, { Marker } from 'react-native-maps';
import { Student } from '../types/Student';
import { googleApiKey } from '../../keys';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Route } from '../types/Route';
import { WayPoint } from './OrderTransport';
import MapViewDirections from 'react-native-maps-directions';

export function TransporteScreen() {

  const navigation = useNavigation();
  const GOOGLE_MAPS_APIKEY = googleApiKey;
  const isFocused = useIsFocused();

  const [student, setStudent] = useState<Student>();
  const [route, setRoute] = useState<Route>();
  const [waypoint, setWaypoint] = useState<WayPoint[]>([]);
  const [vacancy, setVancancy] = useState({})
  const [message, setMessage] = useState('')
  const [MessagesUpdate, setMessagesUpdate] = useState(false);
  const [messagesLoad, setMessagesLoad] = useState([]);
  const [updateInfo, setUpudateInfo] = useState(false);

  const {
    sendMessage,
    loadMessages,
    updateVacancyRequest,
    loadRoute
  } = useData()

  function filterWaypoints() {

    if (route) {
      if (route.points.length > 2) {
        const filteredPoints = route.points.slice(1, route.points.length - 1);
        let wapPointsFormated: WayPoint[] = [];
        filteredPoints.map(point => {
          wapPointsFormated.push({ name: point.name, latitude: Number(point.latitude), longitude: Number(point.longitude) })
        })
        setWaypoint(wapPointsFormated)
      }
    }
  }

  useEffect(() => {
    async function getStatus() {
      const data = await loadVacancy();
      await setVancancy(data)
      await setUpudateInfo(false);
    }

    async function getRoute() {
      const response = await loadRoute(vacancy.route);

      await setRoute(response);
    }

    async function getStudent() {
      const studentSaved = await AsyncStorage.getItem('@teoapp:student');
      const studentParse = studentSaved ? (JSON.parse(studentSaved)) : {};
      await setStudent(studentParse[0])
    }

    getStatus();
    getStudent();
    getRoute();


    setUpudateInfo(false);

  }, [updateInfo])

  useEffect(() => {
    filterWaypoints();
    setUpudateInfo(false)
  }, [route])

  useEffect(() => {
    updateVacancy();
  }, [])


  useEffect(() => {
    async function getMessages() {
      const msgs = await loadMessages(vacancy.id);
      await setMessagesLoad(msgs)
      setMessagesUpdate(false)
      setUpudateInfo(false)
    }

    getMessages()
  }, [MessagesUpdate, updateInfo])


  async function updateVacancy() {
    const dataVacancy = await updateVacancyRequest();
    setUpudateInfo(true)
  }

  async function handleMessage() {

    await sendMessage(vacancy.id, vacancy.student_id, message)
    setMessage('')
    Alert.alert('Mensagem enviada')
    setMessagesUpdate(true)
  }

  return (
    <View style={[styles.container, styles.androidSafeArea]}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Transporte
        </Text>
      </View>

      <ScrollView style={styles.body}>
        <View>

          <TouchableOpacity onPress={updateVacancy}>
            <View style={styles.schooldata}>
              <View style={styles.dataWrapper}>
                <Text style={styles.dataTitle}>Status do pedido</Text>
                <View style={styles.statusButton}>
                  <View>
                    {
                      vacancy.status === 'in_progress' &&
                      <Text style={[styles.dataText, { color: colors.color_secondary }]}>Pedido em análise</Text>
                    }
                    {
                      vacancy.status === 'rejected' &&
                      <Text style={[styles.dataText, { color: colors.color_warning }]}>Pedido indeferido</Text>
                    }
                    {
                      vacancy.status === 'accepted' &&
                      <Text style={[styles.dataText, { color: colors.green }]}>Pedido deferido</Text>
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
        <View>

          {
            vacancy.status === 'in_progress' &&
            <View>
              <View style={styles.wrapper}>
                <View>
                  <Text style={styles.dataTitle}>Mensagens</Text>

                  <ScrollView style={styles.msgView}>


                    {
                      messagesLoad.map((message) => {

                        if (message.from_id === vacancy.student_id) {
                          return (
                            <View key={message.id} style={styles.msgDivStudent}>
                              <Text style={styles.msgUserName}>Você</Text>
                              <Text style={styles.msg}>{message.message}</Text>
                            </View>
                          )
                        } else {
                          return (
                            <View key={message.id} style={styles.msgDiv}>
                              <Text style={styles.msgUserServer}>Servidor</Text>
                              <Text style={styles.msgServer}>{message.message}</Text>
                            </View>
                          )
                        }

                      })
                    }

                  </ScrollView>

                </View>
              </View>

              <View style={styles.submitButton}>
                <TextInput
                  style={styles.messageInput}
                  placeholder='Mensagem'
                  onChangeText={value => setMessage(value)}
                  value={message}
                />
                <Button
                  color={colors.green}
                  onPress={handleMessage}
                  title='Enviar'
                />
              </View>
            </View>

          }
          {
            vacancy.status === 'rejected' &&
            <View>

            </View>
          }
          {
            vacancy.status === 'accepted' &&

            <View style={styles.mapWrapper}>


              {(student && route) && (
                <>
                  <View style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    backgroundColor: 'white',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    opacity: 0.6,
                    top: 280,
                    zIndex: 1000

                  }}>
                    <View style={{
                        width: '100%',
                        paddingVertical: 8
                        }}>
                      <Text style={styles.title}>{route.name}</Text>

                      {/* <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={styles.title}>Horário: </Text>
                        <Text style={{ marginRight: 8 }}>{route.timeDeparture}</Text>
                        <FontAwesome5 style={{ marginRight: 8}} name="arrows-alt-h" size={24} color={colors.gray_medium} />
                        <Text style={{ marginRight: 8 }}>{route.timeArrival}</Text>
                      </View> */}

                    </View>
                  </View>

                  <MapView style={styles.map}
                    initialRegion={{
                      latitude: Number(student?.latitude),
                      longitude: Number(student?.longitude),
                      latitudeDelta: 0.050,
                      longitudeDelta: 0.050
                    }}
                  >

                    <Marker
                      coordinate={{ latitude: Number(student?.latitude), longitude: Number(student?.longitude) }}
                      title={"Minha casa"}
                      description={''}
                      pinColor={colors.gray_medium}
                    />


                    <MapViewDirections
                      origin={{
                        latitude: Number(route.points[0].latitude),
                        longitude: Number(route.points[0].longitude)
                      }}
                      waypoints={waypoint}
                      destination={{
                        latitude: Number(route.points[route.points.length - 1].latitude),
                        longitude: Number(route.points[route.points.length - 1].longitude)
                      }}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={6}
                      strokeColor={colors.green}
                    />

                    <Marker
                      coordinate={{ latitude: Number(route.points[0].latitude), longitude: Number(route.points[0].longitude) }}
                      title={"Início"}
                      description={''}
                    />

                    <Marker
                      coordinate={{
                        latitude: Number(route.points[route.points.length - 1].latitude),
                        longitude: Number(route.points[route.points.length - 1].longitude)
                      }}
                      title={"Final"}
                      description={''}
                    />

                    {waypoint.map((waypoint, index) => (
                      <Marker
                        key={index}
                        coordinate={waypoint}
                        title={`Parada: ${waypoint.name}`}
                        pinColor={colors.color_secondary}
                      />
                    ))}

                  </MapView>
                </>
              )}
            </View>
          }

        </View>
      </ScrollView>

    </View >
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
    height: '100%',
    width: '86%',
    marginTop: 64
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

  submitButton: {
    marginVertical: 64
  },

  messageInput: {
    borderWidth: 1,
    borderColor: colors.gray_medium,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10

  },

  wrapper: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.gray_medium,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  msgDivStudent: {
    borderWidth: 0.5,
    borderColor: colors.gray_medium,
    borderRadius: 10,
    marginBottom: 16,
    width: '90%'
  },

  msgDiv: {
    borderWidth: 0.5,
    borderColor: colors.gray_medium,
    borderRadius: 10,
    marginBottom: 16,
    width: '90%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginLeft: '10%'
  },

  msgView: {
    marginTop: 16
  },

  msgUserName: {
    fontFamily: fonts.title,
    fontSize: 10,
    color: colors.gray_medium,
    marginLeft: 6,
    marginTop: 6
  },

  msg: {
    marginTop: 10,
    marginBottom: 6,
    marginLeft: 8
  },

  msgUserServer: {
    fontFamily: fonts.title,
    fontSize: 10,
    color: colors.gray_medium,
    marginRight: 6,
    marginTop: 6
  },

  msgServer: {
    marginTop: 10,
    marginBottom: 6,
    marginRight: 8
  },
  statusButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonIcon: {
    marginRight: 20
  },

  // MAP

  map: {
    width: '100%',
    height: '100%',

  },

  mapWrapper: {
    flex: 1,
    height: 360,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.gray_medium,
    borderRadius: 10,
    overflow: 'hidden'
  }

})

