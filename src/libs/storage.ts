import AsyncStorage from '@react-native-async-storage/async-storage';

export interface emailProp {
  email: string
}

export interface Ifile {
  name: string;
  type: string;
  uri: string;
}

export interface UserStudentDataProps {
  name: string;
  rg: string;
  cpf: string;
  borndate: string;
  password: string;
  deficiencyInfo: string;
  address: string;
  number: string;
  complement: string;
  uf: string;
  city: string;
}

export interface CreateUserDadasProps {
  name: string;
  rg: string;
  cpf: string;
  borndate: string;
  password: string;
  deficiencyInfo: string;
  address: string;
  number: string;
  complement: string;
  uf: string;
  city: string
  schoolId: string;
  classe: string;
  shift: string;
  series: string;
}

export interface UserDadasProps {
  name: string;
  rg: string;
  cpf: string;
  borndate: string;
  password: string;
  deficiencyInfo: string;
}

export interface UserAdressProps {
  adress: string;
  number: string;
  complement: string;
  uf: string;
  city: string
}

export interface UserSchoolDataProps {
  school_id: string;
  classe: string;
  shift: string;
  series: string;

}

export interface IVacancyRequest {
  id: string;
  studentId: string;
  status: string;
  route: string;
  createAt: string;
  updateAt: string;
}

export interface ISchool {
  id: string;
  name: string;
  address: string;
  number: string;
  district: string;
  complement: string;
  uf: string;
  city: string;
  cep: string;
  email: string;
  phone: string;
  point_id: string;
  created_at: string;
  updated_at: string;
}

export async function saveSchool(school: ISchool) {
  try {

    const schoolSaved = await AsyncStorage.setItem('@teoapp:school', JSON.stringify(school));
    return schoolSaved;

  } catch(err) {

    throw new Error(err)

  }
}

export async function loadSchool() {
  try {

    const data = await AsyncStorage.getItem('@teoapp:school');
    const school = data ? (JSON.parse(data) as ISchool) : {};
    return school;

  } catch(err) {

    throw new Error(err)

  }
}

export async function saveVacancy(vacancy: IVacancyRequest) {
  try {

    const vacancySaved = await AsyncStorage.setItem('@teoapp:vacancyrequest', JSON.stringify(vacancy));
    return vacancySaved;

  } catch(err) {

    throw new Error(err)

  }
}

export async function loadVacancy() {
  try {

    const data = await AsyncStorage.getItem('@teoapp:vacancyrequest');
    const vacancy = data ? (JSON.parse(data) as IVacancyRequest) : {};
    return vacancy;

  } catch(err) {

    throw new Error(err)

  }
}

export async function checkEmail(email: string) {
  try{

    await AsyncStorage.setItem('@teoapp:userEmail', email);

  } catch (err) {
    throw new Error(err)
  }
}

export async function userImageSave(image: Ifile) {

  try{

    const save = await AsyncStorage.setItem('@teoapp:userimage', JSON.stringify(image));
    return save;

  } catch(err) {

    throw new Error(err)

  }
}

export async function userImageLoad()  {

  try{

    const data = await AsyncStorage.getItem('@teoapp:userimage');
    const image = data ? (JSON.parse(data) as Ifile) : {};

    return image;

  } catch(err) {

    throw new Error(err)

  }
}

export async function userDataSave(userdata: UserDadasProps) {

  try{

    const save = await AsyncStorage.multiSet([
      ['@teoapp:username', userdata.name],
      ['@teoapp:userrg', userdata.rg],
      ['@teoapp:usercpf', userdata.cpf],
      ['@teoapp:userbornadte', userdata.borndate],
      ['@teoapp:userpassword', userdata.password],
      ['@teoapp:userdeficiencyInfo', userdata.deficiencyInfo]
    ])

    return save

  } catch (err) {
    throw new Error(err)
  }

}

export async function userAdressSave(userAdress: UserAdressProps) {

  try{

    const save = await AsyncStorage.multiSet([
      ['@teoapp:useradress', userAdress.adress],
      ['@teoapp:usernumber', userAdress.number],
      ['@teoapp:usercomplement', userAdress.complement || ''],
      ['@teoapp:useruf', userAdress.uf],
      ['@teoapp:usercity', userAdress.city],

    ])

    return save

  } catch (err) {
    throw new Error(err)
  }

}

export async function userSchoolSave(userSchool: UserSchoolDataProps) {

  try{

    const save = await AsyncStorage.multiSet([
      ['@teoapp:userschool', userSchool.userSchool],
      ['@teoapp:usershift', userSchool.userShift],
      ['@teoapp:userseries', userSchool.userSerie],
      ['@teoapp:userclass', userSchool.class],

    ])
    return save

  } catch (err) {
    throw new Error(err)
  }

}

export async function getData() {

  const userSaved = await AsyncStorage.getItem('@teoapp:student');
  return userSaved ? (JSON.parse(userSaved)) : {};

}

export async function getUser() {
  try {

    const userId = await AsyncStorage.getItem('@teoapp:userId');
    const userName = await AsyncStorage.getItem('@teoapp:username');

    return {
      userId,
      userName
    };

  } catch(err) {

    throw new Error(err)

  }
}

