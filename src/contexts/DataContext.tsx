import React, { createContext, ReactNode, useContext } from 'react';
import api from '../services/api';
import { getData, userImageLoad, saveVacancy, loadVacancy } from '../libs/storage';

interface DataContextProps {
  getSchools: () => [any];
  getSchool: () => Object;
  createUser: () => void;
  getVacancyRequest: () => Object;
  orderTransport: (id: string) => string;
  loadMessages: (vacancyrequest: string) => [any]
  sendMessage: (vacancyrequest: string, from: string, message: string) => void;
  updateVacancyRequest: () => object

}


interface DataProviderProps {
  children: ReactNode

}

export const DataContext = createContext({} as DataContextProps);

export function DataProvider({children, ...rest}: DataProviderProps) {

  async function checkEmail(email: string) {

  }

  async function getSchools() {
    const schools = await api.get('/schools');
    console.log(schools.data)
    return schools.data;
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

  async function createUser() {
    const userdata = await getData();
    const image = await userImageLoad();

    const user = new FormData();
    user.append('image', image)
    user.append('name', userdata.name)
    user.append('email', userdata.email)
    user.append('rg', userdata.rg)
    user.append('cpf', userdata.cpf)
    user.append('borndate', userdata.borndate)
    user.append('password', userdata.password)
    user.append('deficiencyInfo', userdata.deficiencyInfo)
    user.append('adress', userdata.adress)
    user.append('number', userdata.number)
    user.append('complement', userdata.complement)
    user.append('uf', userdata.uf)
    user.append('city', userdata.city)
    user.append('schoolId', userdata.schoolId)
    user.append('shift', userdata.shift)
    user.append('series', userdata.series)
    user.append('classe', userdata.classe)



    const response = await api.post('/students', user)
    return response.data;
  }

  async function orderTransport(id: string) {
    try{
      const { data }  = await api.post('vacancyrequest', {
        studentid: id,
        status: 'in_progress'
      })

      await saveVacancy(data[0]);

      return data
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

  return (
    <DataContext.Provider
      value={{
        getSchools,
        getSchool,
        createUser,
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
