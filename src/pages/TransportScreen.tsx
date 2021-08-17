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
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons/'



export function TransporteScreen() {

  const [vacancy, setVancancy] = useState({})
  const [message, setMessage] = useState('')
  const [MessagesUpdate, setMessagesUpdate] = useState(false);
  const [messagesLoad, setMessagesLoad] = useState([]);

  const [updateInfo, setUpudateInfo] = useState(false)


  const navigation = useNavigation();

  const { sendMessage, loadMessages, updateVacancyRequest } = useData()


  useEffect(() => {
    async function getStatus() {
      const data = await loadVacancy()
      await setVancancy(data)
      console.log(vacancy.id)
      setUpudateInfo(false)

    }
    getStatus()
  }, [updateInfo])

  useEffect(() => {
    async function getMessages() {
      const msgs = await loadMessages(vacancy.id);
      await setMessagesLoad(msgs)
      setMessagesUpdate(false)
      setUpudateInfo(false)

      console.log(msgs)
    }
    getMessages()
  }, [MessagesUpdate, updateInfo])

  async function updateVacancy() {
    const dataVacancy = await updateVacancyRequest();
    setUpudateInfo(true)
    console.log(dataVacancy)
  }

  async function handleMessage() {

    await sendMessage(vacancy.id, vacancy.student_id, message)
    setMessage('')
    Alert.alert('Mensagem enviada')
    setMessagesUpdate(true)
    console.log(message)
  }

  return (
    <View style={[styles.container, styles.androidSafeArea]}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Meu Transporte
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
          <View>

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
    width: '86%',
    marginTop: 64
  },

  userdata: {
    borderWidth: 1,
    borderColor: colors.gray_medium,
    borderRadius: 10
  },

  ImageView: {
    justifyContent: 'center',
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
    marginBottom: 8

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
  }


})

