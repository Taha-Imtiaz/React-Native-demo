import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import CreateContactComponent from '../../components/CreateContactComponent';
import {CONTACT_LIST, CREATE_CONTACT} from '../../constants/routeNames';
import createContact from '../../context/actions/contacts/createContact';
import {GlobalContext} from '../../context/Provider';
import uploadImage from '../../helpers/uploadImage';
import countryCodes from '../../utils/countryCodes';

const CreateContact = () => {
  const sheetRef = useRef(null);
  const [form, setForm] = useState({});
  const [uploading, setIsUploading] = useState(false);

  const [localFile, setLocalFile] = useState(null);

  const {navigate} = useNavigation();
  const {params} = useRoute();

  const {
    contactsDispatch,
    contactsState: {
      createContact: {loading, error},
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    if (params?.contact) {
      const {
        first_name: firstName,
        phone_number: phoneNumber,
        last_name: lastName,
        is_favorite: isFavorite,
        country_code: countryCode,
      } = params?.contact;

      setForm(prevState => ({
        ...prevState,
        firstName,
        phoneNumber,
        lastName,
        isFavorite,
      }));
      const country = countryCodes.find(item => {
        return item.value.replace('+', '') === countryCode;
      });

      if (country) {
        setForm(prevState => ({
          ...prevState,
          countryCode: country.key.toUpperCase(),
        }));
      }

      if (params?.contact?.contact_picture) {
        setLocalFile(params?.contact?.contact_picture);
      }
    }
  }, []);
  console.log(`form ${JSON.parse(JSON.stringify(form))}`);
  console.log(`local file ${localFile}`);
  const onChangeText = ({name, value}) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onSubmit = () => {
    if (params?.contact) {
      // updating existing picture


      if (localFile?.size) {
        setIsUploading(true);
        uploadImage(localFile)(url => {
          setIsUploading(false);
          // console.log('🚀 ~ file: index.js ~ line 35 ~ uploadImage ~ url', url);
          editContact({...form, contactPicture: url})(contactsDispatch)(
            () => {
              navigate(CONTACT_LIST);
            },
          );
        })(error => {
          // console.log(
          //   '🚀 ~ file: index.js ~ line 44 ~ uploadImage ~ error',
          //   error,
          // );
          setIsUploading(false);
        });
      } else {
        editContact(form)(contactsDispatch)(
          () => {
            navigate(CONTACT_LIST);
          },
        )
      }


    } else {
      if (localFile?.size) {
        setIsUploading(true);
        uploadImage(localFile)(url => {
          setIsUploading(false);
          // console.log('🚀 ~ file: index.js ~ line 35 ~ uploadImage ~ url', url);
          createContact({...form, contactPicture: url})(contactsDispatch)(
            () => {
              navigate(CONTACT_LIST);
            },
          );
        })(error => {
          // console.log(
          //   '🚀 ~ file: index.js ~ line 44 ~ uploadImage ~ error',
          //   error,
          // );
          setIsUploading(false);
        });
      } else {
        createContact(form)(contactsDispatch)(
          () => {
            navigate(CONTACT_LIST);
          },
        )
      }
    }
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
    // console.log(
    //   '🚀 ~ file: index.js ~ line 54 ~ onFileSelected ~ image',
    //   image,
    // );
  };

  return (
    <CreateContactComponent
      onSubmit={onSubmit}
      onChangeText={onChangeText}
      form={form}
      setForm={setForm}
      loading={loading || uploading}
      toggleValueChange={toggleValueChange}
      error={error}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      openSheet={openSheet}
      onFileSelected={onFileSelected}
      localFile={localFile}
    />
  );
};

export default CreateContact;
