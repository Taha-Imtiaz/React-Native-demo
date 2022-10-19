import {View, Text} from 'react-native';
import React from 'react';
import {Image, SafeAreaView} from 'react-native';
import styles from './styles';
import Container from '../../components/common/Container';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { SETTINGS } from '../../constants/routeNames';

const SideMenu = ({navigation}) => {
  const menuItems = [
    {icon: <Text>T</Text>, name: 'Settings',onPress:() => navigation.navigate(SETTINGS)},
    {icon: <Text>T</Text>, name: 'Logout', onPress:() => {}},
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
          {menuItems.map(({name, icon,onPress}) => (
            <TouchableOpacity key={name} style={styles.item} onPress = {onPress}>
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
