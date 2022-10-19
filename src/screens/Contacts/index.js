import {Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../components/common/Container';
import {useNavigation} from '@react-navigation/native';

const Contacts = () => {
  const {setOptions, toggleDrawer} = useNavigation();
  useEffect(() => {
    // dynamically set options
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer(); //for toggling drawer
          }}>
          <Text style={{padding: 10}}>Nav</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <Container>
      <Text>Hi From Contacts</Text>
    </Container>
  );
};
export default Contacts;
