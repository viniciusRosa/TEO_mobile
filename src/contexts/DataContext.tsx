import React, { createContext, ReactNode, useContext, useState } from 'react';
import api from '../services/api';
import { getData, userImageLoad, saveVacancy, loadVacancy } from '../libs/storage';
import { School } from '../types/School';
import { Student } from '../types/Student';
import { ImageType } from '../types/Image';
import { AsyncStorage } from 'react-native';


interface DataContextProps {
  getSchools: () => School[];
  getSchool: () => Object;
  createStudent: (student: Student) => void;
  getVacancyRequest: () => Object;
  orderTransport: (id: string, routeSelected: string) => string;
  loadMessages: (vacancyrequest: string) => [any];
  sendMessage: (vacancyrequest: string, from: string, message: string) => void;
  updateVacancyRequest: () => object;
  loadRoutes: () => [];

}

export const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const DataProvider: React.FC = ({children, ...rest}) => {


  async function checkEmail(email: string) {

  }

  async function getSchools() {
    const { data } = await api.get('/schools');
    return data;
  }

  async function getSchool(id: string) {
    const school = await api.get(`/schools/${id}`);
    return school.data[0];
  }

  async function getVacancyRequest(studentId: string) {
    const vacancyrequest = await api.get(`/vacancyrequest/student/${studentId}`);
    return vacancyrequest.data[0];
  }

  async function updateVacancyRequest() {
    const vacancy = await loadVacancy();
    const vacancyRequest = await getVacancyRequest(vacancy.student_id)
    const saved = await saveVacancy(vacancyRequest)
    console.log('foi')
    console.log(vacancyRequest)
    return saved;
  }

  async function createStudent(data: Student, image: ImageType) {
    // const image = await userImageLoad();
    const email = await AsyncStorage.getItem('@teoapp:userEmail')

    const user = new FormData();
    user.append('image', image)
    user.append('name', data.name)
    user.append('email', email || '')
    user.append('rg', data.rg)
    user.append('cpf', data.cpf)
    user.append('borndate', data.borndate)
    user.append('password', data.password)
    user.append('deficiencyInfo', data.deficiencyInfo)
    user.append('address', data.address)
    user.append('number', data.number)
    user.append('complement', data.complement)
    user.append('uf', data.uf)
    user.append('city', data.city)
    user.append('schoolId', data.schoolId)
    user.append('shift', data.shift)
    user.append('series', data.series)
    user.append('classe', data.classe)

    const response = await api.post('/students', user);
    await AsyncStorage.setItem('@teoapp:student', JSON.stringify(response.data))
    const userSaved = await AsyncStorage.getItem('@teoapp:student');
    return userSaved ? (JSON.parse(userSaved)) : {};
  }

  async function orderTransport(id: string, routeSelected: string) {
    try{
      const { data }  = await api.post('vacancyrequest', {
        studentid: id,
        route: routeSelected,
        status: 'in_progress'
      })

      await saveVacancy(data[0]);
      return data;

    } catch(err) {

      throw new Error(err)

    }
  }

  async function loadMessages(vacancyrequest: string) {
    const response = await api.get(`messages/${vacancyrequest}`);
    return response.data;
  }

  async function sendMessage(vacancyrequest: string, from: string, message: string) {
    await api.post('/messages', {
      vacancyrequestId: vacancyrequest,
      from: from,
      to: 'e4927df6-12a1-4350-bd4f-05b299c05354',
      message: message
    })
  }

  async function loadRoutes() {
    const response = await api.get('routes');
    return response.data;
  }

  return (
    <DataContext.Provider
      value={{
        loadRoutes,
        getSchools,
        getSchool,
        createStudent,
        getVacancyRequest,
        orderTransport,
        loadMessages,
        sendMessage,
        updateVacancyRequest
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  return useContext(DataContext);
}
