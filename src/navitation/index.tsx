import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import {useSelector} from 'react-redux';
import {getAuthState} from 'src/store/auth';
import TabNavigator from './TabNavigator';

const AppNavigator = () => {
  const {loggedIn} = useSelector(getAuthState);
  return (
    <NavigationContainer>
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
