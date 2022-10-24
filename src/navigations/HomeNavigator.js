import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import {
  CONTACT_DETAIL,
  CONTACT_LIST,
  CREATE_CONTACT,
  SETTINGS,
} from '../constants/routeNames';
import ContactDetail from '../screens/ContactDetail';
import Contacts from '../screens/Contacts';
import CreateContact from '../screens/CreateContact';
import Settings from '../screens/Settings';

const HomeNavigator = () => {
  // create stack navigator
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName={CONTACT_LIST}>
      <HomeStack.Screen
        name={CONTACT_LIST}
        component={Contacts}
        // 1 method of setting options
        // options = {{headerLeft:() => <Text style= {{padding:10}}>Nav</Text>}}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name={CONTACT_DETAIL}
        component={ContactDetail}></HomeStack.Screen>
      <HomeStack.Screen
        name={CREATE_CONTACT}
        component={CreateContact}></HomeStack.Screen>
      <HomeStack.Screen name={SETTINGS} component={Settings}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};
//    screens
// Home Screen
// Drawer
// Auth Screens

// create navigator called stack navigator
// for e.g user request from contact list to contact details screen the conatact list will be popped out and contact details shown

export default HomeNavigator;
