import React, {useEffect, useState} from 'react';
import RegisterComponent from '../../components/Signup';
import envs from '../../config/env';
import axiosInstace from '../../helpers/axiosInterceptor';
const Register = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const {DEV_BACKEND_URL} = envs;

  // console.log(`DEV_BACKEND_URL ${DEV_BACKEND_URL}`);
  // console.log(`__DEV__ ${__DEV__}`);
  useEffect(() => {
    axiosInstace.post(`/auth/login`,)
  }, []);

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
    console.log('🚀 ~ file: index.js ~ line 13 ~ onChange ~ form', form);
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
  };
  return (
    <RegisterComponent
      onChange={onChange}
      onSubmit={onSubmit}
      form={form}
      errors={errors}
    />
  );
};

export default Register;
