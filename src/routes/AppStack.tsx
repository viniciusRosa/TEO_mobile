import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Begin } from '../pages/Begin';
import { Dashboard } from '../pages/Dashboard';

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => {
  return (

    <Navigator
      headerMode='none'
      screenOptions= {{
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
      >

      <Screen
        name='Welcome'
        component={Welcome}
      />

      <Screen
        name='UserIdentification'
        component={UserIdentification}
      />

      <Screen
        name='Begin'
        component={Begin}
      />

      <Screen
        name='Dashboard'
        component={Dashboard}
      />

      </Navigator>

  )
}

export default AppStack;
