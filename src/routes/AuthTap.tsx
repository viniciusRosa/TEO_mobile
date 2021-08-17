import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import colors from '../styles/colors';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons/'
import { Dashboard } from '../pages/Dashboard';
import { UserScreen } from '../pages/UserScreen';
import { SchoolScreen } from '../pages/SchoolScreen';
import { TransporteScreen } from '../pages/TransportScreen';


const AppTap = createBottomTabNavigator();

const AuthTab = () => (

  <AppTap.Navigator
    tabBarOptions={{
      activeTintColor: colors.green,
      inactiveTintColor: colors.gray_medium,
      labelPosition: 'below-icon',
      style: {
        paddingBottom: 24,
        height: 88,

      }
    }}>

      <AppTap.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='dashboard' size={size} color={color} />
          )
        }}
       />

      <AppTap.Screen
        name='Acadêmico'
        component={SchoolScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name='user-graduate' size={size} color={color} />
          )
        }}
       />

        <AppTap.Screen
        name='Transporte'
        component={TransporteScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name='bus' size={size} color={color} />
          )
        }}
       />

      <AppTap.Screen
        name='Usuário'
        component={UserScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name='user-alt' size={size} color={color} />
          )
        }}
       />


  </AppTap.Navigator>
)

export default AuthTab;
