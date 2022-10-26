import {TouchableOpacity} from 'react-native';
import React, {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from '../../components/common/Icon';
import ContactsComponent from '../../components/ContactsComponent';
import {GlobalContext} from '../../context/Provider';
import getContacts from '../../context/actions/contacts/getContacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONTACT_DETAIL } from '../../constants/routeNames';

const Contacts = () => {
  // console.log(
  //   '🚀 ~ file: index.js ~ line 11 ~ Contacts ~ navigation',
  //   navigation.navigate,
  // );
  const {navigate, setOptions, toggleDrawer} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const contactsRef = useRef([]);

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
    const prevState = contactsRef.current;
    // update ref with newly added state
    contactsRef.current = data;

    const newList = contactsRef.current;
    if (newList.length - prevState.length === 1) {
      const newContact = newList.find(
        item => !prevState.map(i => i.id).includes(item.id),
      );
      // console.log(`new Contact ${newContact}`);
      navigate(CONTACT_DETAIL, {item: newContact})
    }
  }, [data.length]);

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
