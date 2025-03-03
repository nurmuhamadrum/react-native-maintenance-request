import React from 'react';
import {StatusBar} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// helpers
import {navigationRef} from '@/helpers/RootNavigation';
import {Theme} from '@/helpers/ThemeConfig';
import {RootStackParamList} from '@/helpers/StackParamList';
// screen navigation
import Home from '@/modules/home/Navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ApplicationNavigator: React.FC = () => {
  return (
    <PaperProvider theme={Theme}>
      <StatusBar
        translucent
        barStyle={Theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor="rgba(0, 0, 0, 0.0)"
      />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
          initialRouteName="Home">
          <React.Fragment>
            <Stack.Screen name="Home" component={Home} />
          </React.Fragment>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default ApplicationNavigator;
