import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeStackParamList} from '@/helpers/StackParamList';
import {Home} from './screens';
import {Form} from './screens';
import {AppHeader} from '@/components';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const Navigation = () => {
  const renderAppHeader = (props: any) => <AppHeader {...props} />;
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        header: renderAppHeader,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Form"
        component={Form}
        options={{
          title: 'Maintenance Request',
          headerTitleAlign: 'center',
          headerShadowVisible: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
