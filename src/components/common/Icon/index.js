import {View, Text} from 'react-native';
import React from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import ZocialIcon from 'react-native-vector-icons/Zocial';

const getIconFont = type => {
  switch (type) {
    case 'fontisto':
      return FontistoIcon;

    case 'material':
      return MaterialIcon;
    case 'fontisto':
      return FontistoIcon;
    case 'evil':
      return EvilIcon;

    case 'feather':
      return FeatherIcon;
    case 'ant':
      return AntDesignIcon;
    case 'simpleLine':
      return SimpleLineIcon;

    case 'zocial':
      return ZocialIcon;
    case 'materialCommunity':
      return MaterialCommunityIcon;
    case 'entypo':
      return EntypoIcon;

    case 'foundation':
      return FoundationIcon;
    case 'ecticon':
      return OctIcon;
    case 'ionicon':
      return IonIcon;
    default:
      return FontAwesomeIcon;
  }
};
const Icon = ({type, ...props}) => {
  const FontIcon = getIconFont(type);
  return <FontIcon {...props}/>;
};

export default Icon;
