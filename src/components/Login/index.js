import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Container from '../../components/common/Container';
import CustomButton from '../../components/common/CustomButton';
import Input from '../../components/common/Input';
import {REGISTER} from '../../constants/routeNames';
import styles from './styles';
const LoginComponent = (props) => {
  console.log('🚀 ~ file: index.js ~ line 11 ~ LoginComponent ~ props', props);
  const {navigate} = useNavigation();
  return (
    <Container>
      <Image
        source={require(`../../assets/images/logo.png`)}
        height={70}
        width={70}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome To RNContacts</Text>
        <Text style={styles.subTitle}>Please Login Here</Text>

        <View style={styles.form}>
          <Input
            label="Username"
            iconPosition="right"
            placeholder="Enter Username"
            // error = "This Field is required"
          />
          <Input
            label="Password"
            placeholder="Enter Password"
            secureTextEntry={true}
            icon={<Text>Show</Text>}
            iconPosition="right"
          />

          <CustomButton primary title="Submit" />

          <View style={styles.createSection}>
            <Text style={styles.infoText}>Need a new account ? </Text>
            <TouchableOpacity
              onPress={() => {
                navigate(REGISTER);
              }}>
              <Text style={styles.linkBtn}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default LoginComponent;
