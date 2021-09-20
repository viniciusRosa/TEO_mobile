import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { FontAwesome5 } from '@expo/vector-icons';

interface PathItem {
  id: string;
  name: string;
  address: string;
  latitude: number,
  longitude: number
}

interface RouteItemProps extends RectButtonProps {
  data: {
    id: string;
    name: string;
    shift: string;
    timeDeparture?: string;
    timeArrival?: string;
    points: PathItem[];
  }
  active?: boolean;
}

export function RouteItem({
  data,
  active = false,
  ...rest
}: RouteItemProps) {

  const [streetName, setStreetName] = useState('');

  useEffect(() => {

    function concatAddress() {
      let addresses = '';
      data.points.map(point => {
        addresses += point.address + ', ';
      })
      setStreetName(addresses);
    }
    concatAddress();
  }, [])



  return (
    <RectButton style={[
      styles.container,
      active && styles.containerActive
    ]} {...rest} >

      <View style={[
        styles.content,
        active && styles.contentActive
      ]}>
        <View style={styles.columnContent}>
          <View style={styles.columnleft}>
            <FontAwesome5 name="bus" size={48} color={colors.gray_medium} />
            <Text>
              {data.name}
            </Text>
          </View>

          <View style={styles.columnRight}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.title}>Turno: </Text>
              <Text>
                {data.shift}
              </Text>

            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={styles.title}>Horário: </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginRight: 8 }}>{data.timeDeparture}</Text>
                <FontAwesome5 style={{ marginRight: 8 }} name="arrows-alt-h" size={24} color={colors.gray_medium} />
                <Text style={{ marginRight: 8 }}>{data.timeArrival}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.title}>Rota: </Text>
              <View style={{}}>
                <Text>{streetName}</Text>
              </View>
            </View>

          </View>
        </View>
      </View>

    </RectButton>
  )
}







const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 12,
  },

  containerActive: {
    color: colors.green,

  },

  content: {
    flex: 1,
    width: '100%',
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors.gray_medium,
    color: colors.gray_medium,
    fontFamily: fonts.text_medium,
    padding: 10
  },

  contentActive: {
    borderColor: colors.green,
    color: colors.green,
    fontFamily: fonts.text_medium
  },

  columnContent: {
    flex: 1,
    flexDirection: 'row',
  },

  columnleft: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  columnRight: {
    width: '65%'
  },

  title: {
    fontWeight: 'bold'
  }

})
