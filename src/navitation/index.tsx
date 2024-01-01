import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from 'src/store/auth';
import TabNavigator from './TabNavigator';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import client from 'src/api/client';
import {StyleSheet, View} from 'react-native';
import Loader from '@ui/Loader';
import colors from '@utils/colors';

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.PRIMARY,
    primary: colors.CONTRAST,
  },
};

const AppNavigator = () => {
  const {loggedIn, busy} = useSelector(getAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true));
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) {
          dispatch(updateBusyState(false));
          return;
        }
        const {data} = await client.get('/auth/is-auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        dispatch(updateProfile(data.profile));
        dispatch(updateLoggedInState(true));
      } catch (error) {
        console.log('error ' + error);
      }
      dispatch(updateBusyState(false));
    };
    fetchAuthInfo();
  }, [dispatch]);

  return (
    <NavigationContainer theme={appTheme}>
      {busy ? (
        <View style={{...StyleSheet.absoluteFillObject, ...styles.container}}>
          <Loader />
        </View>
      ) : null}
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    backgroundColor: colors.OVERLAY,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
