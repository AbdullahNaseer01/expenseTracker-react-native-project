import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native'; // Import KeyboardAvoidingView
import NavigationHeader from '../../../components/NavigationHeader';
import AppButton from '../../../components/AppButton';
import {useDispatch, useSelector} from 'react-redux';
import useUpdateProfile from './useUpdateProfile'; // Import the custom hook
import {fetchUserData} from '../../../store/slices/userSlice';
import AttachmentInputPopUp from '../../../components/AttachmentInputPopUp';
import {RootState} from '../../../store/store';
import Alert from '../../../components/Alert';
import {styles} from './styles';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const {user, isLoading, error} = useSelector((state: any) => state.user);
  const {
    displayName,
    setDisplayName,
    email,
    setEmail,
    handleUpdateProfile,
    fileModalVisible,
    toggleFileModal,
    handleUpdateUserImg,
    handleImageThrougGallery,
    handleImageThroughCamera,
    message,
    alertVisible,
    handleAlertVisible,
  } = useUpdateProfile(); // Use the custom hook

  useEffect(() => {
    dispatch(fetchUserData() as any);
  }, [dispatch]);

  return (
    <>
      <View style={styles.container}>
        <NavigationHeader
          title={'Update Profile'}
          headerStyle={{textColor: 'black'}}
        />
        <View style={styles.profileView}>
          <View style={styles.imageContainer}>
            {isLoading ? (
              <Image source={require('../../../assets/loader.png')} />
            ) : (
              <Image
                style={styles.userImage}
                source={
                  user && user.profileImage
                    ? {uri: user.profileImage}
                    : require('../../../assets/user.png')
                }
              />
            )}
          </View>
          <TouchableOpacity
            onPress={toggleFileModal}
            style={styles.editButtonContainer}>
            <View style={styles.editButton}>
              <Image
                source={require('../../../assets/edit.png')}
                style={styles.editIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              editable={false}
            />
          </View>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            value={displayName}
            onChangeText={setDisplayName}
          />
        </View>
        <View style={styles.updateProfileBtn}>
          <AppButton title={'Update Profile'} onPress={handleUpdateProfile} />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={fileModalVisible}
        onRequestClose={toggleFileModal}>
        <View style={styles.fileModalContainer}>
          <View style={styles.modalBackground} />
          <View style={styles.attachmentPopup}>
            <AttachmentInputPopUp
              handleImageThrougGallery={handleImageThrougGallery}
              handleImageThroughCamera={handleImageThroughCamera}
            />
          </View>
        </View>
      </Modal>
      <Alert
        message={message}
        onPress={handleAlertVisible}
        visible={alertVisible}
      />
    </>
  );
};

export default UpdateProfile;
