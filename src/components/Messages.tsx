import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { loadVacancy, getUser } from '../libs/storage';
import { useData } from '../contexts/DataContext'
import { BottonButton } from './BottonButton';


export function Messages() {

  const { loadMessages } = useData()

  const [MessagesUpdate, setMessagesUpdate] = useState(false);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {

    async function getMessages() {
      const vacancy = await loadVacancy()
      const messages = await loadMessages('e4927df6-12a1-4350-bd4f-05b299c05354')
      const userData = await getUser()
      await setUser(userData)
      setMessages(messages)
      console.log(user)
      console.log(vacancy)
    }
    getMessages();
    setMessagesUpdate(false)
  }, [MessagesUpdate])

  return (

    <View style={styles.wrapper}>
      <View>
        <Text style={styles.dataTitle}>Mensagens</Text>

        <ScrollView>
          {
            messages.map((message) => {

              // if (message.from_id === user.userId) {
                return (
                  <View>
                    <Text key={message.id}>{message.message}</Text>
                    {/* <Text key={message.id}>{message.message}</Text> */}
                  </View>
                )
              // } else {

              // }

            })
          }


        </ScrollView>
      </View>
    </View>

  )
}


const styles = StyleSheet.create({

  wrapper: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.gray_medium,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  dataTitle: {
    fontFamily: fonts.title,
    fontSize: 10,
    color: colors.gray_medium,
  },


})

