import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {GlobalContext} from '../context/Provider';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {navigationRef} from './SideMenu/RootNavigator';

const AppNavContainer = () => {
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [authLoaded, setAuthLoaded] = useState(false);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setAuthLoaded(true);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setAuthLoaded(true);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  useEffect(() => {
    if (authLoaded) {
      SplashScreen.hide(); //when app loaded hide splash screen
    }
  }, [authLoaded]);
  return (
    <>
      {authLoaded ? (
        <NavigationContainer ref={navigationRef}>
          {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};
//    screens
// Home Screen
// Drawer
// Auth Screens

// create navigator called stack navigator
// for e.g user request from contact list to contact details screen the conatact list will be popped out and contact details shown

export default AppNavContainer;
