import {View, Text, Image, Switch, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButton from '../common/CustomButton';
import CountryPicker from 'react-native-country-picker-modal';
import {DEFAULT_IMAGE_URI} from '../../constants/general';
import colors from '../../assets/theme/colors';
import ImagePicker from '../common/ImagePicker';

const CreateContactComponent = ({
  onChangeText,
  loading,
  error,
  onSubmit,
  setForm,
  toggleValueChange,
  form,
  sheetRef,
  openSheet,
  closeSheet,
  onFileSelected,
  localFile,
}) => {
  // console.log('🚀 ~ file: index.js ~ line 26 ~ localFile', localFile);

  return (
    <View style={styles.container}>
      <Container>
        <Image
          source={{uri: localFile?.path || localFile || DEFAULT_IMAGE_URI}}
          style={styles.imageView}
        />
        <TouchableOpacity onPress={openSheet}>
          <Text style={styles.chooseText}>Choose image</Text>
        </TouchableOpacity>
        <Input
          onChangeText={value => {
            onChangeText({name: 'firstName', value});
          }}
          label={'First Name'}
          value = {form.firstName || ''}
          placeholder="Enter First Name"
          error={error?.first_name?.[0]}
        />
        <Input
          onChangeText={value => {
            onChangeText({name: 'lastName', value});
          }}
          label={'Last Name'}
          value = {form.lastName || ''}

          placeholder="Enter Last Name"
          error={error?.last_name?.[0]}
        />
        <Input
          icon={
            <CountryPicker
              withFilter
              withFlag
              countryCode={form.countryCode || undefined}
              withCountryNameButton={false}
              withCallingCode
              withCallingCodeButton
              withEmoji
              onSelect={value => {
                // console.log(`value ${JSON.stringify(value)}`);
                // get the country code
                const phoneCode = value.callingCode[0]; //get first calling code
                const cCode = value.cca2;
                setForm({...form, phoneCode, countryCode: cCode});
              }} //triggers when user selects a country
            />
          }
          style={{paddingLeft: 10}}
          value = {form.phoneNumber || ''}

          iconPosition="left"
          onChangeText={value => {
            onChangeText({name: 'phoneNumber', value});
          }}
          label={'Phone Number'}
          placeholder="Enter Phone Number"
          error={error?.phone_number?.[0]}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 17}}>Add to Favorites</Text>
          <Switch
            trackColor={{false: 'blue', true: colors.primary}}
            thumbColor={`#ffffff`}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleValueChange}
            value={form.isFavorite}
          />
        </View>
        <CustomButton
          loading={loading}
          disabled={loading}
          onPress={onSubmit}
          primary
          title={`Submit`}
        />
      </Container>
      <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
    </View>
  );
};

export default CreateContactComponent;
