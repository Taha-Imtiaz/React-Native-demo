import { TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../components/common/Icon';
import ContactsComponent from '../../components/ContactsComponent';

const Contacts = () => {
  const {setOptions, toggleDrawer} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    // dynamically set options
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer(); //for toggling drawer
          }}>
          <Icon
            type="material"
            size={25}
            style={{padding: 10}}
            name="menu"></Icon>
        </TouchableOpacity>
      ),
    });
  }, []);

  return <ContactsComponent modalVisible = {modalVisible} setModalVisible = {setModalVisible}/>;
};
export default Contacts;
