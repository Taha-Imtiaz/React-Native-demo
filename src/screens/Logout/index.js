import {ActivityIndicator} from 'react-native';
import React, {useContext, useEffect} from 'react';
import logoutUser from '../../context/actions/auth/logoutUser';
import { GlobalContext } from '../../context/Provider';

const Logout = () => {
  const {authDispatch} = useContext(GlobalContext);
  useEffect(() => {
    logoutUser()(authDispatch)
  }, []);
  return <ActivityIndicator />;
};

export default Logout;
