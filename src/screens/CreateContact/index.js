import {useNavigation} from '@react-navigation/native';
import React, {useContext, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import CreateContactComponent from '../../components/CreateContactComponent';
import {CONTACT_LIST, CREATE_CONTACT} from '../../constants/routeNames';
import createContact from '../../context/actions/contacts/createContact';
import {GlobalContext} from '../../context/Provider';

const CreateContact = () => {
  const sheetRef = useRef(null);
  const [form, setForm] = useState({});
  const [localFile, setLocalFile] = useState(null);

  const {navigate} = useNavigation();
  const {
    contactsDispatch,
    contactsState: {
      createContact: {loading, error},
    },
  } = useContext(GlobalContext);

  const onChangeText = ({name, value}) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onSubmit = () => {
    createContact(form)(contactsDispatch)(() => {
      navigate(CONTACT_LIST);
    });
  };
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };
  const toggleValueChange = () => {
    setForm({
      ...form,
      isFavorite: !form.isFavorite,
    });
  };
  // console.log(
  //   '🚀 ~ file: index.js ~ line 10 ~ CreateContact ~ loading',
  //   loading,
  // );
  // console.log(`form ${JSON.stringify(form)}`);

  const onFileSelected = image => {
    // closeSheet
    closeSheet();
    setLocalFile(image);
    console.log(
      '🚀 ~ file: index.js ~ line 54 ~ onFileSelected ~ image',
      image,
    );
  };

  return (
    <CreateContactComponent
      onSubmit={onSubmit}
      onChangeText={onChangeText}
      form={form}
      setForm={setForm}
      loading={loading}
      toggleValueChange={toggleValueChange}
      error={error}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      openSheet={openSheet}
      onFileSelected={onFileSelected}
      localFile = {localFile}
    />
  );
};

export default CreateContact;
