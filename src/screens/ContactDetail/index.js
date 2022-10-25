import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import ContactDetailsComponent from '../../components/ContactDetailsComponent';

const ContactDetail = () => {
  const {params:{item = {}} ={}} = useRoute();
  // console.log('🚀 ~ file: index.js ~ line 7 ~ ContactDetail ~ item', item);
  return (
   <ContactDetailsComponent contact = {item}/>
  );
};

export default ContactDetail;
