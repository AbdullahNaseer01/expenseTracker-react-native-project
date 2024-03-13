import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../../store/slices/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
// import
const useProfile = () => {
  const [confirmAlert, setConfirmAlert] = useState(false);
  const dispatch = useDispatch();
  const {user, isLoading, error} = useSelector(
    (state: RootState) => state.user,
  );

  // Fetch user data upon component mount
  useEffect(() => {
    dispatch(fetchUserData() as any);
  }, [dispatch]);

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => ToastAndroid.show('Signed out successfully', ToastAndroid.SHORT));
    setConfirmAlert(false);
  };
  const handleCancelSignOut = () => {
    setConfirmAlert(false);
  };

  return {confirmAlert, setConfirmAlert, handleCancelSignOut, handleSignOut, user, isLoading, error};
};

export default useProfile;
