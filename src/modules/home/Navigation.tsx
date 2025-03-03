import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeStackParamList} from '@/helpers/StackParamList';
import {Home} from './screens';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
