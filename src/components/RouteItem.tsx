import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PathItem {
  id: string;
  street: string;
}

interface RouteItemProps extends RectButtonProps {
  data: {
    id: string;
    name: string;
    shift: string;
    path: PathItem[];
  }
  active?: boolean;
}

export function RouteItem({
  data,
  active = false,
  ...rest
}: RouteItemProps) {
  return (
    <RectButton style={[
      styles.container,
      active && styles.containerActive
      ]} {...rest} >

      <View style={[
        styles.content,
        active && styles.contentActive
        ]}>
        <Text>
          {data.name}
          {data.shift}
        </Text>
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
    // fontFamily: fonts.heading,
    color: colors.green,
    // backgroundColor: colors.green
  },

  content: {
    flex: 1,
    width: '100%',
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors.gray_medium,
    color: colors.gray_medium,
    fontFamily: fonts.text_medium,
  },

  contentActive: {
    borderColor: colors.green,
    color: colors.green,
    fontFamily: fonts.text_medium
  }
})
