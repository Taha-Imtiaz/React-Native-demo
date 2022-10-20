import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {Image, SafeAreaView} from 'react-native';
import styles from './styles';
import Container from '../../components/common/Container';
import {SETTINGS} from '../../constants/routeNames';
import logoutUser from '../../context/actions/auth/logoutUser';
import Icon from '../../components/common/Icon';

const SideMenu = ({navigation, authDispatch}) => {
  const handleLogout = () => {
    // close drawer when open when close open drawer
    navigation.toggleDrawer();
    // show Alert
    Alert.alert(`Logout`, `Are you sure you want to Logout?`, [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Ok',
        onPress: () => {
          logoutUser()(authDispatch);
        },
      },
    ]);
  };

  const menuItems = [
    {
      icon: <Icon type="fontisto" name="player-settings" size={17}></Icon>,
      name: 'Settings',
      onPress: () => navigation.navigate(SETTINGS),
    },
    {
      icon: <Icon type="material" name="logout" size={17}></Icon>,
      name: 'Logout',
      onPress: handleLogout,
    },
  ];
  return (
    //using SafeAreaView so it prevents the content would not overflow
    <SafeAreaView>
      <Container>
        <Image
          source={require(`../../assets/images/logo.png`)}
          height={70}
          width={70}
          style={styles.logoImage}
        />
        <View style={{paddingHorizontal: 70}}>
          {menuItems.map(({name, icon, onPress}) => (
            <TouchableOpacity key={name} style={styles.item} onPress={onPress}>
              {icon}
              <Text style={styles.itemText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default SideMenu;
