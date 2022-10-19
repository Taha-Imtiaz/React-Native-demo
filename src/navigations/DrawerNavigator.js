import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import {HOME_NAVIGATOR} from '../constants/routeNames';
import HomeNavigator from './HomeNavigator';
import SideMenu from './SideMenu';

const getDrawerContent = navigation => {
  console.log(
    '🚀 ~ file: DrawerNavigator.js ~ line 11 ~ getDrawerContent ~ navigation',
    navigation,
  );
  return <SideMenu navigation={navigation} />;
};
const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  // component for NavItems

  // create stack navigator
  return (
    // use navigator as a component
    <Drawer.Navigator
      drawerType="slide"
      drawerContent={(
        // Navigation props give access to the navigation
        {navigation},
      ) => getDrawerContent(navigation)}>
      <Drawer.Screen
        name={HOME_NAVIGATOR}
        component={HomeNavigator}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
