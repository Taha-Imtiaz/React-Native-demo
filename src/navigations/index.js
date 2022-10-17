import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const AppNavContainer = () => {
  const isLoggedIn = true;

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
//    screens
// Home Screen
// Drawer
// Auth Screens

// create navigator called stack navigator
// for e.g user request from contact list to contact details screen the conatact list will be popped out and contact details shown

export default AppNavContainer;
