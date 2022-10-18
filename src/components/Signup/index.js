import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';
import {LOGIN} from '../../constants/routeNames';
import styles from './styles';
const RegisterComponent = ({onChange, onSubmit, form, errors}) => {
  // console.log(
  //   '🚀 ~ file: index.js ~ line 11 ~ RegisterComponent ~ props',
  //   props,
  // );
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
        <Text style={styles.subTitle}>Create a Free Account</Text>

        <View style={styles.form}>
          <Input
            label="Username"
            iconPosition="right"
            placeholder="Enter Username"
            onChangeText={value => {
              onChange({name: 'userName', value});
            }}
            error={errors.userName}
          />
          <Input
            label="First Name"
            iconPosition="right"
            placeholder="Enter First Name"
            onChangeText={value => {
              onChange({name: 'firstName', value});
            }}
            error={errors.firstName}
          />
          <Input
            label="Last Name"
            iconPosition="right"
            placeholder="Enter Last Name"
            onChangeText={value => {
              onChange({name: 'lastName', value});
            }}
            error={errors.lastName}
          />
          <Input
            label="Email"
            iconPosition="right"
            placeholder="Enter Email"
            onChangeText={value => {
              onChange({name: 'email', value});
            }}
            error={errors.email}
          />
          <Input
            label="Password"
            placeholder="Enter Password"
            secureTextEntry={true}
            icon={<Text>Show</Text>}
            iconPosition="right"
            onChangeText={value => {
              onChange({name: 'password', value});
            }}
            error={errors.password}
          />

          <CustomButton onPress={onSubmit} primary title="Submit" />

          <View style={styles.createSection}>
            <Text style={styles.infoText}>Already have an account ? </Text>
            <TouchableOpacity
              onPress={() => {
                navigate(LOGIN);
              }}>
              <Text style={styles.linkBtn}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default RegisterComponent;
