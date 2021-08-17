import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Button } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useForm, Controller } from 'react-hook-form';

import * as ImagePicker from 'expo-image-picker';

import unknownUser from '../assets/images/unknownUser.png'
import { StyledInputText } from '../components/StyledInputText';

interface FormData {
  name: string;
  rg: string;
  cpf: string;
  borndate: string;
}

export function UserEditForm() {
  const navigation = useNavigation();

  const [pickedImagePath, setPicketImagePath] = useState('');

  const { control, handleSubmit, formState: {errors} } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log(data);
    navigation.navigate('Confirmation', {
      title: 'Dados Salvos',
      icon: 'verified',
      nextScreen: 'UserScreen'
    })
  };

  const openCamera = async () => {
    const permissionCameraResult = await ImagePicker.requestCameraPermissionsAsync();
    const permissionMediaResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionCameraResult.granted === false) {
      alert('Você recusou acesso a sua câmera');
      return;
    }

    if (permissionMediaResult.granted === false) {
      alert('Você recusou o acesso a sua galeria de fotos.')
      return
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setPicketImagePath(result.uri);
      console.log(result.uri);
    }
  }

  return (
      <View style={[styles.container, styles.androidSafeArea]}>

        <View style={styles.header}>
          <Text style={styles.title}>
            Editar perfil
          </Text>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <ScrollView style={[styles.body]}>

            <View style={styles.ImageView}>
              <TouchableOpacity style={styles.camera} onPress={openCamera}>
                {
                  pickedImagePath === ''
                    ? <Image source={unknownUser} style={styles.thumbnail} />
                    : <Image source={{ uri: String(pickedImagePath)}} style={styles.thumbnail}/>
                }

              </TouchableOpacity>
              <Text style={styles.bodyTextTitle}> Foto </Text>
            </View>

            {/* <Controller
              control={control}
              render={({ field: {onChange, onBlur, value} }) => (
                <StyledInputText
                  ask='Nome Completo'
                  placeholder='Nome'
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
              )}
              name='name'
              rules={{required: true}}
            />

            <Controller
              control={control}
              render={({ field: {onChange, onBlur, value} }) => (
                <StyledInputText
                  ask='Número do RG'
                  placeholder='RG'
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
              )}
              name='rg'
              rules={{required: true}}
            />

            <Controller
              control={control}
              render={({ field: {onChange, onBlur, value} }) => (
                <StyledInputText
                  ask='Número do CPF'
                  placeholder='CPF'
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
              )}
              name='cpf'
              rules={{required: true}}
            />

            <Controller
              control={control}
              render={({ field: {onChange, onBlur, value} }) => (
                <StyledInputText
                  ask='Data de nascimento'
                  placeholder='DD/MM/AAAA'
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
              )}
              name='borndate'
              rules={{required: true}}
            /> */}

            <View style={styles.submitButton}>
              <Button
                color={colors.green}
                title='Salvar'
                onPress={handleSubmit(onSubmit)}
                />

            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
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
    marginVertical: 64
  },

  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
})

