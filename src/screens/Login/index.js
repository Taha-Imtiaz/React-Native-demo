import {useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import LoginComponent from '../../components/Login';
import loginUser from '../../context/actions/auth/loginUser';
import {GlobalContext} from '../../context/Provider';

const Login = () => {
  const [form, setForm] = useState({});
  const [justSignedUp, setJustSignedUp] = useState(false);

  const {params} = useRoute();
  const {
    authDispatch,
    authState: {error, loading},
  } = useContext(GlobalContext);
  useEffect(() => {
    if (params?.data) {
      setJustSignedUp(true)
      console.log('🚀 ~ file: index.js ~ line 16 ~ useEffect ~ params', params);
      setForm({
        ...form,
        userName: params.data.username,
      });
    }
  }, [params]);

  const onSubmit = () => {
    if (form.userName && form.password) {
      loginUser(form)(authDispatch);
    }
  };
  const onChange = ({name, value}) => {
    setJustSignedUp(false)
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <LoginComponent
      onChange={onChange}
      onSubmit={onSubmit}
      form={form}
      error={error}
      loading={loading}
      justSignedUp={justSignedUp}
    />
  );
};

export default Login;
