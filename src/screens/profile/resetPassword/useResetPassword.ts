import { Alert } from 'react-native';
import { useState } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';

import { PasswordResetData } from '../../../types/types';

const useResetPassword = (): PasswordResetData => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleResetPassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Please fill all fields');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('New passwords do not match');
      return;
    }

    const emailCred = firebase.auth.EmailAuthProvider.credential(
      auth().currentUser?.email || '',
      currentPassword,
    );

    auth()
      .currentUser?.reauthenticateWithCredential(emailCred)
      .then(() => {
        return auth().currentUser?.updatePassword(newPassword);
      })
      .then(() => {
        Alert.alert('Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      })
      .catch((error: any) => {
        Alert.alert('Error', error.message);
      });
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    handleResetPassword,
  };
};

export default useResetPassword;
