import React, { useEffect, useState } from 'react';
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
  Button,
  Alert
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import unknownUser from '../assets/images/unknownUser.png'
import { StyledInputText } from '../components/StyledInputText';
import { StyledInput } from '../components/StyledInput';
import axios from 'axios';
import { useData } from '../contexts/DataContext';

import {
  CreateUserDadasProps,
  userImageLoad,
  userImageSave
} from '../libs/storage'
import { School } from '../types/School';
import { ImageType } from '../types/Image';

export function FirstAccessUserForm() {

  const {
    getSchools,
    createStudent
  } = useData();

  const activeValidation = false
  const navigation = useNavigation();

  const [pickedImagePath, setPicketImagePath] = useState('');
  const [deficiencyInfo, setDeficiencyInfo] = useState('');
  const [deficiency, setDeficiency] = useState(false);
  const [image, setImage] = useState<ImageType>(unknownUser);

  const [ufs, setUfs] = useState([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [empyFields, setEmpyFields] = useState(false);

  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    async function  loadSchools() {
      const response = await getSchools();
      setSchools(response);
    }
    loadSchools();
  }, [])

  useEffect(() => {
    async function imageRecovery() {
      const {uri} = await userImageLoad();
      setPicketImagePath(uri ? uri : '')
    }
    imageRecovery()
  }, [])

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);
        setUfs(ufInitials);
      })
  }, []);

  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);
        setCities(cityNames);
      })
  }, [selectedUf]);

  const { control, handleSubmit, formState: { errors } } = useForm<CreateUserDadasProps>({});

  const onSubmit = async (data: CreateUserDadasProps) => {

    data.deficiencyInfo = deficiencyInfo;
    data.uf = selectedUf;
    data.city = selectedCity;
    data.schoolId = selectedSchool;
    data.shift = selectedShift;
    data.series = selectedSeries;

      try{
        const user = createStudent(data, image);
        navigation.navigate('Confirmation', {
          title: 'Dados Salvos',
          icon: 'verified',
          nextScreen: 'OrderTransport',
        })

    } catch (err) {
      Alert.alert('Algo deu Errado')
    }
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
      const photo = {
        uri: result.uri,
        type: 'image/jpg',
        name: 'studentPhoto.jpg'
      }
      setImage(photo);
      await userImageSave(photo)
    }
  }

  return (
    <View style={[styles.container, styles.androidSafeArea]}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Meu perfil
        </Text>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <ScrollView style={[styles.body]}>

          <View style={styles.ImageView}>

            <TouchableOpacity style={styles.camera} onPress={openCamera}>
              {
                image?.uri
                ? <Image source={{ uri: image?.uri }} style={styles.thumbnail} />
                : <Image source={unknownUser} style={styles.thumbnail} />
              }

            </TouchableOpacity>

            <Text style={styles.bodyTextTitle}> Foto </Text>
          </View>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                ask='Nome Completo'
                placeholder='Nome'
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name='name'
            rules={{ required: activeValidation }}
          />
          {errors.name && <Text style={styles.errorText}> Este campo é obrigatorrio</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInputText
                type={'custom'}
                options={{
                  mask: '999.999.99-99'
                }}
                ask='Número do RG'
                placeholder='RG'
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name='rg'
            rules={{ required: activeValidation }}
          />
          {errors.rg && <Text style={styles.errorText}> Este campo é obrigatorrio</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInputText
                type={'cpf'}
                ask='Número do CPF'
                placeholder='CPF'
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name='cpf'
            rules={{ required: activeValidation }}
          />
          {errors.cpf && <Text style={styles.errorText}> Este campo é obrigatorrio</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInputText
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY'
                }}
                ask='Data de nascimento'
                placeholder='DD/MM/AAAA'
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name='borndate'
            rules={{ required: activeValidation }}
          />
          {errors.borndate && <Text style={styles.errorText}> Este campo é obrigatorrio</Text>}

          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerTitle}>Portador de deficiência</Text>
            <Picker
              style={styles.picker}
              selectedValue={deficiency}
              onValueChange={(itemValue, itemIndex) =>
                setDeficiency(itemValue)
              }>

              <Picker.Item label="Não" value={false} />
              <Picker.Item label="Sim" value={true} />
            </Picker>
          </View>

          {deficiency
            ? (
              <StyledInput
                ask='Qual?'
                placeholder=''
                onChangeText={value => setDeficiencyInfo(value)}
                value={deficiencyInfo}
              />
            )
            : (
              <View></View>
            )
          }

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                secureTextEntry={true}
                ask='Defina uma senha'
                placeholder=''
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name='password'
            rules={{ required: activeValidation }}
          />
          {errors.password && <Text style={styles.errorText}> Este campo é obrigatorrio</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                ask='Endereço'
                placeholder='Ex: Rua...'
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name='address'
            rules={{ required: activeValidation }}
          />
          {errors.address && <Text style={styles.errorText}> Este campo é obrigatorrio</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                ask='Numero'
                placeholder='Ex: 111'
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                keyboardType='numeric'
              />
            )}
            name='number'
            rules={{ required: activeValidation }}
          />
          {errors.number && <Text style={styles.errorText}> Este campo é obrigatorrio</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                ask='Complemento'
                placeholder='Ex: ap 111 bloco A...'
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name='complement'
            rules={{ required: false }}
            defaultValue=''
          />

          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerTitle}>Estado</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedUf}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedUf(itemValue)
              }>

              <Picker.Item label="Selecione o Estado" value="" />
              {
                ufs.map(uf => {
                  return (
                    <Picker.Item key={uf} label={uf} value={uf} />
                  )
                })
              }
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerTitle}>Cidade</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedCity}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCity(itemValue)
              }>
              <Picker.Item label="Selecione o Estado" value="" />
              {
                cities.map(city => {
                  return (
                    <Picker.Item key={city} label={city} value={city} />
                  )
                })
              }

            </Picker>
          </View>

          {
            empyFields ? <Text style={styles.errorText}>Estado e cidade são campos obrigatórios</Text> : <Text></Text>
          }

          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerTitle}>Escola em que estuda</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedSchool}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSchool(itemValue)
              }>
              <Picker.Item label="Selecione a escola" value="escola" />

              {
                schools.map(school => {
                  return (
                    <Picker.Item key={school.id} label={school.name} value={school.id} />
                  )
                })
              }
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerTitle}>Turno em que estuda</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedShift}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedShift(itemValue)
              }>

              <Picker.Item label="Selecione o turno" value="" />
              <Picker.Item label="Manhã" value="manha" />
              <Picker.Item label="Tarde" value="tarde" />
              <Picker.Item label="Noite" value="noite" />

            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerTitle}>Série</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedSeries}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSeries(itemValue)
              }>

              <Picker.Item label="Selecione a série" value="" />
              <Picker.Item label="1º ano" value="1a" />
              <Picker.Item label="2º ano" value="2a" />
              <Picker.Item label="3º ano" value="3a" />
              <Picker.Item label="4º ano" value="4a" />
              <Picker.Item label="5º ano" value="5a" />
              <Picker.Item label="6º ano" value="6a" />

            </Picker>
          </View>

          <Controller
              control={control}
              render={({ field: {onChange, onBlur, value} }) => (
                <StyledInput
                  ask='Turma'
                  placeholder=''
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  />
              )}
              name='classe'
              rules={{required: false}}
              defaultValue= ''
            />

            {
              empyFields  ? <Text style={styles.errorText}>Escola e turno são campos obrigatórios</Text> : <Text></Text>
            }


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

  bodyTextTitle: {
    fontFamily: fonts.title,
    fontSize: 16,
    color: colors.gray,
    marginBottom: 8

  },

  submitButton: {
    marginVertical: 64
  },

  pickerTitle: {
    width: '100%',
    fontSize: 16,
    marginTop: 36,
    color: colors.gray,
    fontFamily: fonts.title,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  picker: {
    color: colors.gray,
    marginTop: 16,
    fontFamily: fonts.title,
  },

  pickerWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_medium,
    borderRadius: 5,
    marginTop: 16,
    width: '100%',
    padding: 10,
    textAlign: 'left'
  },

  errorText: {
    marginTop: 16,
    color: 'red',
    fontWeight: 'bold'

  }

})

