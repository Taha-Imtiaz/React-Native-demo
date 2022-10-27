import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import CreateContactComponent from '../../components/CreateContactComponent';
import {
  CONTACT_DETAIL,
  CONTACT_LIST,
  CREATE_CONTACT,
} from '../../constants/routeNames';
import createContact from '../../context/actions/contacts/createContact';
import editContact from '../../context/actions/contacts/editContact';
import {GlobalContext} from '../../context/Provider';
import uploadImage from '../../helpers/uploadImage';
import countryCodes from '../../utils/countryCodes';

const CreateContact = () => {
  const sheetRef = useRef(null);
  const [form, setForm] = useState({});
  const [uploading, setIsUploading] = useState(false);

  const [localFile, setLocalFile] = useState(null);

  const {navigate,setOptions} = useNavigation();
  const {params} = useRoute();
  // console.log(
  //   '🚀 ~ file: index.js ~ line 20 ~ CreateContact ~ params',
  //   params?.contact.contact_picture,
  // );

  const {
    contactsDispatch,
    contactsState: {
      createContact: {loading, error},
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    if (params?.contact) {
      setOptions({title: 'Update contact'});
      const {
        first_name: firstName,
        phone_number: phoneNumber,
        last_name: lastName,
        is_favorite: isFavorite,
        country_code: countryCode,
      } = params?.contact;

      setForm(prev => {
        return {
          ...prev,
          firstName,
          isFavorite,
          phoneNumber,
          lastName,
          phoneCode: countryCode,
        };
      });

      const country = countryCodes.find(item => {
        return item.value.replace('+', '') === countryCode;
      });

      if (country) {
        setForm(prev => {
          return {
            ...prev,
            countryCode: country.key.toUpperCase(),
          };
        });
      }

      if (params?.contact.contact_picture) {
        setLocalFile(params?.contact.contact_picture);
      }
    }
  }, []);
  // console.log(`form ${JSON.parse(JSON.stringify(form))}`);
  // console.log(`local file ${localFile}`);
  const onChangeText = ({name, value}) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onSubmit = () => {
    if (params?.contact) {
      if (localFile?.size) {
        setIsUploading(true);
        uploadImage(localFile)(url => {
          setIsUploading(false);
          editContact(
            {...form, contactPicture: url},
            params?.contact.id,
          )(contactsDispatch)(item => {
            navigate(CONTACT_DETAIL, {item});
          });
        })(err => {
          console.log('err :>> ', err);
          setIsUploading(false);
        });
      } else {
        editContact(form, params?.contact.id)(contactsDispatch)(item => {
          navigate(CONTACT_DETAIL, {item});
        });
      }
    } else {
      if (localFile?.size) {
        setIsUploading(true);
        uploadImage(localFile)(url => {
          setIsUploading(false);
          createContact({...form, contactPicture: url})(contactsDispatch)(
            () => {
              navigate(CONTACT_LIST);
            },
          );
        })(err => {
          console.log(
            '🚀 ~ file: index.js ~ line 116 ~ uploadImage ~ err',
            err,
          );
          setIsUploading(false);
        });
      } else {
        createContact(form)(contactsDispatch)(() => {
          navigate(CONTACT_LIST);
        });
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

  const onFileSelected = image => {
    // closeSheet
    closeSheet();
    setLocalFile(image);
    // console.log(
    //   '🚀 ~ file: index.js ~ line 54 ~ onFileSelected ~ image',
    //   image,
    // );
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
