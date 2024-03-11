import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchUserData,
  updateUserProfile,
  uploadProfileImage,
} from '../../../store/slices/userSlice';
import {RootState} from '../../../store/store';
import ImagePicker from 'react-native-image-crop-picker';
import {Alert, ToastAndroid} from 'react-native';

import {UpdateUserProps} from '../../../types/types';

const useUpdateProfile = (): UpdateUserProps => {
  const dispatch = useDispatch();
  const {user, isLoading, error} = useSelector(
    (state: RootState) => state.user,
  );

  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || '',
  );
  const [email, setEmail] = useState<string>(user?.email || '');
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [fileModalVisible, setFileModalVisible] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [message, setMessage] = useState<string>('');
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  const toggleFileModal = () => {
    setFileModalVisible(!fileModalVisible);
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdateError(null);
      await dispatch(
        updateUserProfile({
          displayName,
          email,
          profileImage: user.profileImage,
        }) as any,
      );
    } catch (error: any) {
      setUpdateError(error.message);
    }
  };
  const handleImageThrougGallery = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(pickedImage => {
      setImage(pickedImage);
      setFileModalVisible(false);
      handleUpdateUserImg(pickedImage);
    });
  };
  const handleImageThroughCamera = () => {
    try {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(pickedImage => {
          setImage(pickedImage);
          setFileModalVisible(false);
          handleUpdateUserImg(pickedImage);
        })
        .catch(error => {
          console.error('Error picking image from camera:', error);
          if (error.code === 'E_PERMISSION_MISSING') {
            Alert.alert(
              'Camera Permission Required',
              'Please grant permission to access the camera.',
            );
          }
          setFileModalVisible(false);
        });
    } catch (error) {
      console.error('Error opening camera:', error);
    }
  };
  const handleAlertVisible = () => {
    setAlertVisible(!alertVisible);
  };

  useEffect(() => {
    dispatch(fetchUserData() as any);
  }, [dispatch, user.profileImage]);

  const handleUpdateUserImg = async (image: any) => {
    try {
      await dispatch(uploadProfileImage(image) as any);
      setMessage('Image uploaded successfully');
      setAlertVisible(true);
    } catch (error: any) {
      setUpdateError(error.message);
      ToastAndroid.show('Error uploading image', ToastAndroid.SHORT);
    }
  };
  return {
    displayName,
    email,
    setDisplayName,
    setEmail,
    updateError,
    handleUpdateProfile,
    isLoading,
    fileModalVisible,
    setFileModalVisible,
    toggleFileModal,
    handleUpdateUserImg,
    handleImageThrougGallery,
    handleImageThroughCamera,
    handleAlertVisible,
    message,
    alertVisible,
  };
};

export default useUpdateProfile;
