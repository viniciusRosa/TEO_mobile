import { ImageType } from './Image';

export type Student = {
  id: string;
  name: string;
  email: string;
  password: string;
  deficiencyInfo: string;
  schoolId: string;
  shift: string;
  series: string;
  classe: string;
  image: ImageType;
  borndate: string;
  cpf: string;
  rg: string;
  address: string;
  number: string;
  complement: string;
  uf: string;
  city: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}
