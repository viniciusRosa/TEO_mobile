import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { getData, saveVacancy, loadVacancy, UserSchoolDataProps } from '../libs/storage';
import { School } from '../types/School';
import { Student } from '../types/Student';
import { ImageType } from '../types/Image';
import { AsyncStorage } from 'react-native';
import { Route } from '../types/Route';

interface DataContextProps {
  checkEmailDb: (email: string) => {}
  getSchools: () => School[];
  getSchool: () => Object;
  createStudent: (student: Student) => void;
  getVacancyRequest: () => Object;
  orderTransport: (id: string, routeSelected: string) => string;
  loadMessages: (vacancyrequest: string) => [any];
  sendMessage: (vacancyrequest: string, from: string, message: string) => void;
  updateVacancyRequest: () => object;
  loadRoutes: () => [];
  loadRoute: (id: string) => Promise<any>;
  updateSchoolData: (data: UserSchoolDataProps) => boolean;
}

export const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const DataProvider: React.FC = ({ children, ...rest }) => {

  const [update, setUpdate] = useState(false);

  async function checkEmailDb(email: string) {
    const { data } = await api.get(`/emailcheck/${email}`)
    console.log(data);
    return data;
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
    return saved;
  }

  async function createStudent(data: Student, image: ImageType) {
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

  async function updateSchoolData(data: UserSchoolDataProps) {
    try {

      const student = await getData();
      console.log(data)
      console.log('STUDENT ' + student[0].id)

      if (data.classe === "") {
        data.classe = student[0].classe;
      }

      if (data.series === "") {
        data.series = student[0].series;
      }

      if (data.shift === "") {
        data.shift = student[0].shift;
      }

      if (data.school_id === "") {
        data.school_id = student[0].school_id;
      }

      const updatedStudent = await api.put(`/students/${student[0].id}`, data);
      await AsyncStorage.setItem('@teoapp:student', JSON.stringify(updatedStudent.data))

      return updatedStudent.data;

    } catch (err) {
      throw new Error('Dados não salvos')
    }
  }

  async function orderTransport(id: string, routeSelected: string) {
    try {
      const { data } = await api.post('vacancyrequest', {
        studentid: id,
        route: routeSelected,
        status: 'in_progress'
      })

      await saveVacancy(data[0]);
      return data;

    } catch (err) {

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

  async function loadRoute(id: string) {
    const response = await api.get(`routewithpoints/${id}`);
    return response.data;
  }

  return (
    <DataContext.Provider
      value={{
        checkEmailDb,
        loadRoute,
        loadRoutes,
        getSchools,
        getSchool,
        createStudent,
        getVacancyRequest,
        orderTransport,
        loadMessages,
        sendMessage,
        updateVacancyRequest,

        updateSchoolData
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  return useContext(DataContext);
}
