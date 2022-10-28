import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../assets/theme/colors';
import Icon from '../../components/common/Icon';
import ContactDetailsComponent from '../../components/ContactDetailsComponent';
import {CONTACT_DETAIL, CONTACT_LIST} from '../../constants/routeNames';
import deleteContact from '../../context/actions/contacts/deleteContact';
import editContact from '../../context/actions/contacts/editContact';
import {GlobalContext} from '../../context/Provider';
import uploadImage from '../../helpers/uploadImage';
import {navigate} from '../../navigations/SideMenu/RootNavigator';

const ContactDetail = () => {
  const {params: {item = {}} = {}} = useRoute();
  // console.log('🚀 ~ file: index.js ~ line 14 ~ ContactDetail ~ item', item);
  const {
    contactsDispatch,
    contactsState: {
      deleteContact: {loading},
    },
  } = useContext(GlobalContext);

  const {setOptions} = useNavigation();
  const sheetRef = useRef(null);
  const [localFile, setLocalFile] = useState(null);
  const [updatingImage, setUpdatingImage] = useState(false);
  const [uploadSucceeded, setUploadSucceeded] = useState(false);

  useEffect(() => {
    if (item) {
      setOptions({
        title: `${item.first_name} ${item.last_name}`,
        headerRight: () => (
          <View style={{flexDirection: 'row', paddingRight: 10}}>
            <TouchableOpacity>
              <Icon
                size={21}
                color={colors.grey}
                name={item.is_favorite ? 'star' : 'star-border'}
                type={`material`}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  `Delete`,
                  `Are you sure you want to remove ${item.first_name}?`,
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                    },
                    {
                      text: 'Ok',
                      onPress: () => {
                        deleteContact(item.id)(contactsDispatch)(() => {
                          navigate(CONTACT_LIST);
                        });
                      },
                    },
                  ],
                );
              }}
              style={{paddingLeft: 10}}>
              {loading ? (
                <ActivityIndicator
                  size={`small`}
                  color={colors.primary}></ActivityIndicator>
              ) : (
                <Icon
                  size={21}
                  color={colors.grey}
                  name="delete"
                  type={`material`}></Icon>
              )}
            </TouchableOpacity>
          </View>
        ),
      });
    }
  }, [item, loading]);

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

  const onFileSelected = image => {
    // closeSheet
    closeSheet();
    setLocalFile(image);
    console.log(`local file ${localFile}`);
    // upload picture to firebase when user choose it
    setUpdatingImage(true);
    uploadImage(localFile)(url => {
      const {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        country_code: phoneCode,
        is_favorite: isFavorite,
      } = item;
      editContact(
        {
          firstName,
          lastName,
          phoneNumber,
          phoneCode,
          isFavorite,
          contactPicture: url,
        },
        item.id,
      )(contactsDispatch)(item => {
        // navigate(CONTACT_DETAIL, {item});
        setUpdatingImage(false);
        setUploadSucceeded(true);
      });
    })(err => {
      console.log('err :>> ', err);
      setUpdatingImage(false);
    });
  };

  return (
    <ContactDetailsComponent
      sheetRef={sheetRef}
      onFileSelected={onFileSelected}
      openSheet={openSheet}
      contact={item}
      localFile={localFile}
      uploadSucceeded={uploadSucceeded}
      updatingImage={updatingImage}
    />
  );
};

export default ContactDetail;
