import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import RegisterComponent from '../../components/Signup';
import envs from '../../config/env';
import {LOGIN} from '../../constants/routeNames';
import register, {clearAuthState} from '../../context/actions/auth/register';
import {GlobalContext} from '../../context/Provider';
import axios from '../../helpers/axiosInterceptor';

const Register = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const {navigate} = useNavigation();
  const {
    authDispatch,
    authState: {error, loading, data},
  } = useContext(GlobalContext);
  console.log('🚀 ~ file: index.js ~ line 18 ~ Register ~ data', data);

  // cancel out evens that are attached
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (data || error) {
          clearAuthState()(authDispatch);
        }
      };
    }, [data, error]),
  );
  const onChange = ({name, value}) => {
    setForm({
      ...form,
      [name]: value,
    });

    if (value) {
      if (name === 'password') {
        if (value.length < 6) {
          setErrors(prevState => ({
            ...prevState,
            [name]: 'This field needs min 6 characters',
          }));
        } else {
          setErrors(prevState => ({
            ...prevState,
            [name]: null,
          }));
        }
      } else {
        setErrors(prevState => ({
          ...prevState,
          [name]: null,
        }));
      }
    } else {
      setErrors(prevState => ({
        ...prevState,
        [name]: 'This field is required',
      }));
    }
  };
  const onSubmit = () => {
    // do validations
    // console.log('🚀 ~ file: index.js ~ line 13 ~ onChange ~ form', form);
    if (!form.userName) {
      setErrors(prevState => ({
        ...prevState,
        userName: 'Please Add a userName',
      }));
    }
    if (!form.firstName) {
      setErrors(prevState => ({
        ...prevState,
        firstName: 'Please Add a First Name',
      }));
    }
    if (!form.lastName) {
      setErrors(prevState => ({
        ...prevState,
        lastName: 'Please Add a Last Name',
      }));
    }
    if (!form.email) {
      setErrors(prevState => ({
        ...prevState,
        email: 'Please Add an email',
      }));
    }
    if (!form.password) {
      setErrors(prevState => ({
        ...prevState,
        password: 'Please Add an password',
      }));
    }
    if (
      Object.values(form).length === 5 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      register(form)(authDispatch)((res) => {
        navigate(LOGIN, {data:res});
      });
    }
  };

  return (
    <RegisterComponent
      onChange={onChange}
      onSubmit={onSubmit}
      form={form}
      errors={errors}
      error={error}
      loading={loading}
    />
  );
};

export default Register;
