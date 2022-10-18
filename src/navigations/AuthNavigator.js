import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LOGIN, REGISTER} from '../constants/routeNames';
import Login from '../screens/Login';
import Register from '../screens/Register';


const AuthNavigator = () => {
  // create stack navigator
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{headerShown:false}}>
      <AuthStack.Screen name={LOGIN} component={Login}></AuthStack.Screen>
      <AuthStack.Screen name={REGISTER} component={Register}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
//    screens
// Home Screen
// Drawer
// Auth Screens

// create navigator called stack navigator
// for e.g user request from contact list to contact details screen the conatact list will be popped out and contact details shown

export default AuthNavigator;
