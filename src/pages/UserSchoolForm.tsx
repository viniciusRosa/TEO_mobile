import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Button
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { StyledInput } from '../components/StyledInput';
import { useData } from '../contexts/DataContext';
import { useEffect } from 'react';
import { School } from '../types/School';
import { saveSchool, UserSchoolDataProps } from '../libs/storage';

export function UserSchoolForm() {

  const {
    getSchools,
    getSchool,
    updateSchoolData
  } = useData();

  const navigation = useNavigation();

  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [empyFields, setEmpyFields] = useState(false)
  const [schools, setSchools] = useState<School[]>([])

  useEffect(() => {
    async function loadSchools() {
      const response = await getSchools();
      setSchools(response);
    }

    loadSchools()
  }, [])

  const { control, handleSubmit, formState: { errors } } = useForm<UserSchoolDataProps>();
  const onSubmit = async (data: UserSchoolDataProps) => {


    data.school_id = selectedSchool;
    data.shift = selectedShift;
    data.series = selectedSeries

    setEmpyFields(false)

    try {

      const result = await updateSchoolData(data);
      console.log(result);
      const school = await getSchool(result[0].school_id);
      console.log(school);

      await saveSchool(school)

      navigation.navigate('Confirmation', {
        title: 'Dados escolares salvos',
        icon: 'verified',
        text: '',
        nextScreen: 'Dashboard'
      })
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <View style={[styles.container, styles.androidSafeArea]}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Meus dados escolares
        </Text>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <ScrollView style={[styles.body]}>

          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerTitle}>Escola em que estuda</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedSchool}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSchool(itemValue)
              }>
              <Picker.Item label="Selecione a escola" value="" />

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
              <Picker.Item label="1º ano do ensino fundamental" value="1º ano do ensino fundamental" />
              <Picker.Item label="2º ano do ensino fundamental" value="2º ano do ensino fundamental" />
              <Picker.Item label="3º ano do ensino fundamental" value="3º ano do ensino fundamental" />
              <Picker.Item label="4º ano do ensino fundamental" value="4º ano do ensino fundamental" />
              <Picker.Item label="5º ano do ensino fundamental" value="5º ano do ensino fundamental" />
              <Picker.Item label="6º ano do ensino fundamental" value="6º ano do ensino fundamental" />
              <Picker.Item label="7º ano do ensino fundamental" value="7º ano do ensino fundamental" />
              <Picker.Item label="8º ano do ensino fundamental" value="8º ano do ensino fundamental" />
              <Picker.Item label="9º ano do ensino fundamental" value="9º ano do ensino fundamental" />
              <Picker.Item label="Ensino médio" color={colors.gray} />
              <Picker.Item label="1º ano do ensino médio" value="1º ano do ensino médio" />
              <Picker.Item label="2º ano do ensino médio" value="2º ano do ensino médio" />
              <Picker.Item label="3º ano do ensino médio" value="3º ano do ensino médio" />


            </Picker>
          </View>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                ask='Turma'
                placeholder=''
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name='classe'
            rules={{ required: false }}
          />

          {
            empyFields ? <Text style={styles.errorText}>Escola e turno são campos obrigatórios</Text> : <Text></Text>
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

  androerrorTextidSafeArea: {
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

