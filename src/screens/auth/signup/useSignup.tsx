import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../store/slices/authSlice';
import { Alert } from 'react-native';

const useSignup = () => {
  const dispatch = useDispatch();
  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const handleSignup = async () => {
    setLoading(true);
    try {
      await dispatch(registerUser({email, password, displayName}) as any);
      setLoading(false);
      console.log('User created successfully===>', userInfo);
    } catch (error: any) {
      Alert.alert('Error', error.message);
      setError(error.message);
      console.log('Error', error.message);
    }
  };

  // const goodleSignIn = async () => {
  //   // try {
  //   //   await GoogleSignin.hasPlayServices();
  //   //   const {idToken} = await GoogleSignin.signIn();
  //   //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //   //   await auth().signInWithCredential(googleCredential);
  //   //   console.log('User signed in successfully');
  //   // } catch (error) {
  //   //   console.error(error);
  //   //   setError(error.message);
  //   // }
  // };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSignup,
    displayName,
    setDisplayName,
  };
};

export default useSignup;
