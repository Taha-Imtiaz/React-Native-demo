import {TouchableOpacity} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from '../../components/common/Icon';
import ContactsComponent from '../../components/ContactsComponent';
import {GlobalContext} from '../../context/Provider';
import getContacts from '../../context/actions/contacts/getContacts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Contacts = () => {
  // console.log(
  //   '🚀 ~ file: index.js ~ line 11 ~ Contacts ~ navigation',
  //   navigation.navigate,
  // );
  const {navigate, setOptions, toggleDrawer} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  console.log('🚀 ~ file: index.js ~ line 14 ~ Contacts ~ sortBy', sortBy);

  const getSettings = async () => {
    const sortPref = await AsyncStorage.getItem(`sortBy`);
    if (sortPref) {
      setSortBy(sortPref);
    }
  };

  // selecting contacts from context api
  const {
    contactsDispatch,
    contactsState: {
      getContacts: {data, loading},
    },
  } = useContext(GlobalContext);
  // console.log(`data ${data}`);
  // console.log(`loading ${loading}`);

  useEffect(() => {
    getContacts()(contactsDispatch);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getSettings();
      return () => {};
    }, []),
  );

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

  return (
    <ContactsComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      data={data}
      loading={loading}
      sortBy={sortBy}
    />
  );
};
export default Contacts;
