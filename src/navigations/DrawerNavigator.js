import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useContext} from 'react';

import {HOME_NAVIGATOR} from '../constants/routeNames';
import {GlobalContext} from '../context/Provider';
import HomeNavigator from './HomeNavigator';
import SideMenu from './SideMenu';

const getDrawerContent = (navigation, authDispatch) => {
  // console.log(
  //   '🚀 ~ file: DrawerNavigator.js ~ line 11 ~ getDrawerContent ~ navigation',
  //   navigation,
  // );
  return <SideMenu navigation={navigation} authDispatch={authDispatch} />;
};
const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  const {authDispatch} = useContext(GlobalContext);

  // component for NavItems

  // create stack navigator
  return (
    // use navigator as a component
    <Drawer.Navigator
      drawerType="slide"
      screenOptions={{headerShown: false}}
      drawerContent={(
        // Navigation props give access to the navigation
        {navigation},
      ) => getDrawerContent(navigation, authDispatch)}>
      <Drawer.Screen
        name={HOME_NAVIGATOR}
        component={HomeNavigator}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
