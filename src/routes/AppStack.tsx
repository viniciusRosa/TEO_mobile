import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Begin } from '../pages/Begin';
import { Dashboard } from '../pages/Dashboard';
import { UserForm } from '../pages/UserForm';
import { Confirmation } from '../pages/Confirmation';
import { UserAdressForm } from '../pages/UserAdressForm';
import { OrderTransport } from '../pages/OrderTransport';
import { UserSchoolForm } from '../pages/UserSchoolForm';
import { Login } from '../pages/Login';
import AuthTab from './AuthTap';
import { UserEditForm } from '../pages/UserEditForm';

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
        name='Login'
        component={Login}
      />

      <Screen
        name='Begin'
        component={Begin}
      />

      <Screen
        name='UserForm'
        component={UserForm}
      />

      <Screen
        name='Confirmation'
        component={Confirmation}
      />

      <Screen
        name='UserAdressForm'
        component={UserAdressForm}
      />

      <Screen
        name='UserSchoolForm'
        component={UserSchoolForm}
      />

      <Screen
        name='OrderTransport'
        component={OrderTransport}
      />

      <Screen
        name='Dashboard'
        component={AuthTab}
      />

      <Screen
        name='UserEditForm'
        component={UserEditForm}
      />

      </Navigator>

  )
}

export default AppStack;
