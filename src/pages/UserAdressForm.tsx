import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Dimensions,
  Alert
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { StyledInput } from '../components/StyledInput';
import { Picker } from '@react-native-picker/picker';
import { UserAdressProps, userAdressSave } from '../libs/storage'


export function UserAdressForm() {

  const activeValidation = false


  const navigation = useNavigation();

  const [ufs, setUfs] = useState([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('')
  const [empyFields, setEmpyFields] = useState(false)

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

  const { control, handleSubmit, formState: { errors } } = useForm<UserAdressProps>({
    defaultValues: {
      uf: '',
      city: ''
    }
  });
  const onSubmit = async (data: UserAdressProps) => {

    if (selectedUf === '' || selectedCity === '') {
      return setEmpyFields(true)
    }

    data.uf = selectedUf;
    data.city = selectedCity;

    console.log(data)

    setEmpyFields(false)

    try {
      const save =  await userAdressSave(data)

      navigation.navigate('Confirmation', {
        title: 'Endereço salvo',
        icon: 'verified',
        text: '',
        nextScreen: 'UserSchoolForm'
      })
    } catch(err) {
      Alert.alert('Algo deu errado')
    }




  };

  return (
    <View style={[styles.container, styles.androidSafeArea]}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Meu endereço
        </Text>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <ScrollView style={[styles.body]}>

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
            name='adress'
            rules={{ required: activeValidation }}
          />
          {errors.adress && <Text style={styles.errorText}> Este campo é obrigatorrio</Text>}

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

  submitButton: {
    marginVertical: 64
  },

  errorText: {
    marginTop: 16,
    color: 'red',
    fontWeight: 'bold'

  }

})

