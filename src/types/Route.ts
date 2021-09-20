export type Route = {
  id: string;
  name: string;
  shift: string;
  timeArrival?: string | null;
  timeDeparture?: string | null;
  vacancy: string;
  created_at: string;
  updated_at: string;
  points: Point[];
}

export type Point = {
  id: string;
  name: string;
  address: string;
  number: string;
  city: string;
  uf: string;
  district: string;
  latitude: string;
  longitude: string;
  point_id: string;
  route_id: string;
  created_at: string;
  updated_at: string;
}

      "address": "R. Albatroz",
      "city": "Osorio",
      "created_at": "2021-09-17T21:55:48.838Z",
      "district": "Albatroz",
      "id": "54f5e897-88da-41a5-8ece-ba29d9cb2a08",
      "latitude": "-29.9032316",
      "longitude": "-50.25822369999999",
      "name": "Garagem Da Prefeitura",
      "number": "330",
      "point_id": "54f5e897-88da-41a5-8ece-ba29d9cb2a08",
      "route_id": "7c006dac-b31b-4e37-8237-782a60093798",
      "uf": "rs",
      "updated_at": "2021-09-17T21:55:48.838Z",
    },
    Object {
      "address": "Rua Prof Ieda Bergamaschi Teixeira",
      "city": "Osorio",
      "created_at": "2021-09-17T21:53:39.124Z",
      "district": "Encosta da Serra",
      "id": "29cb46d5-951a-4a3b-8672-2f6a58172b6a",
      "latitude": "-29.8859157",
      "longitude": "-50.2773208",
      "name": "Escola Rural(Parada de ônibus)",
      "number": "450",
      "point_id": "29cb46d5-951a-4a3b-8672-2f6a58172b6a",
      "route_id": "7c006dac-b31b-4e37-8237-782a60093798",
      "uf": "RS",
      "updated_at": "2021-09-17T21:53:39.124Z",
    },
    Object {
      "address": "Av. Brasil",
      "city": "Osorio",
      "created_at": "2021-09-20T05:07:17.808Z",
      "district": "Porto Lacustre",
      "id": "50526961-6c74-4356-8dd0-5905744b0371",
      "latitude": "-29.890161",
      "longitude": "-50.257344",
      "name": "Prudente",
      "number": "243",
      "point_id": "50526961-6c74-4356-8dd0-5905744b0371",
      "route_id": "7c006dac-b31b-4e37-8237-782a60093798",
      "uf": "rs",
      "updated_at": "2021-09-20T05:07:17.808Z",
    },
  ],

},
]
