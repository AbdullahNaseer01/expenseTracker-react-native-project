import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';
// import
const useProfile = () => {
  const [confirmAlert, setConfirmAlert] = useState(false);

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => ToastAndroid.show('Signed out successfully', ToastAndroid.SHORT));
    setConfirmAlert(false);
  };
  const handleCancelSignOut = () => {
    setConfirmAlert(false);
  };

  return {confirmAlert, setConfirmAlert, handleCancelSignOut, handleSignOut};
};

export default useProfile;
