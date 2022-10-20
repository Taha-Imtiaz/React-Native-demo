import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Container from '../../components/common/Container';
import CustomButton from '../../components/common/CustomButton';
import Input from '../../components/common/Input';
import {REGISTER} from '../../constants/routeNames';
import Message from '../common/Message';
import styles from './styles';
const LoginComponent = ({onChange, onSubmit, justSignedUp, form, loading, error}) => {
  // console.log('🚀 ~ file: index.js ~ line 11 ~ LoginComponent ~ props', props);
  const {navigate} = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
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
        {/* <Message
          retry
          retryFn={() => {
            console.log(`23233 ${232323}`);
          }}
          message={`Invalid Credentials`}
          primary
          onDismiss={() => {}}
        /> */}


        <View style={styles.form}>
          {justSignedUp &&  <Message
            onDismiss={() => {}}
            message={`Account Created Successfully`}
            success
          />}
        {error && !error.error && (
          <Message
            onDismiss={() => {}}
            message={`Invalid Credentials`}
            danger
          />
        )}
          {error?.error && (
            <Message retry danger onDismiss message={error?.error} />
          )}
          <Input
            label="Username"
            iconPosition="right"
            placeholder="Enter Username"
            value={form.userName || ''}
            onChangeText={value => {
              onChange({name: 'userName', value});
            }}
          />
          <Input
            label="Password"
            placeholder="Enter Password"
            secureTextEntry={isSecureEntry}
            icon={
              <TouchableOpacity
                onPress={() => setIsSecureEntry(prevState => !prevState)}>
                <Text>{isSecureEntry ? `Show` : 'Hide'}</Text>
              </TouchableOpacity>
            }
            iconPosition="right"
            onChangeText={value => {
              onChange({name: 'password', value});
            }}
          />

          <CustomButton
            disabled={loading}
            loading={loading}
            onPress={onSubmit}
            primary
            title="Submit"
          />

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
