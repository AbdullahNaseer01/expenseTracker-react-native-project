import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import ConfirmAlert from '../../components/ConfirmAlert';
import useProfile from './useProfile';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {fetchUserData} from '../../store/slices/userSlice';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';

const ProfileHome: React.FC = () => {
  const navigation = useNavigation();
  const {
    confirmAlert,
    setConfirmAlert,
    handleSignOut,
    handleCancelSignOut,
    user,
    isLoading,
    error,
  } = useProfile();

  // Re-render when user data changes (including initially getting populated)

  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.UserProfile}>
          <View style={styles.ImageContainer}>
            {user && user.profileImage ? (
              <Image
                style={styles.ProfileImage}
                source={{uri: user.profileImage}}
              />
            ) : (
              <Image
                style={styles.ProfileImage}
                source={require('../../assets/user.png')}
              />
            )}
          </View>
          <View style={styles.ProfileText}>
            <Text style={styles.usernameText}>Username</Text>
            {/* {user && <Text style={styles.nameText}>{user.displayName}</Text>} */}
            {user ? (
              <Text style={styles.nameText}>{user.displayName}</Text>
            ) : (
              <Text style={styles.nameText}>Loading...</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateProfile' as never)}>
          <Image source={require('../../assets/edit.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.actionContainer}>
            <View style={styles.actionImgContainer}>
              <Image
                style={styles.actionImage}
                source={require('../../assets/setting.png')}
              />
            </View>
            <View>
              <Text style={styles.actionText}>Setting</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPassword' as never)}
            style={styles.actionContainer}>
            <View style={styles.actionImgContainer}>
              <Image
                style={styles.actionImage}
                source={require('../../assets/warning.png')}
              />
            </View>
            <View>
              <Text style={styles.actionText}>Reset Password</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setConfirmAlert(true)}
            style={styles.actionContainer}>
            <View style={styles.actionImgContainer}>
              <Image
                style={styles.actionImage}
                source={require('../../assets/logout.png')}
              />
            </View>
            <View>
              <Text style={styles.actionText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ConfirmAlert
        visible={confirmAlert}
        title={'Logout?'}
        message={'Are you sure you want to logout?'}
        onYesPress={handleSignOut}
        onNoPress={handleCancelSignOut}
      />
    </View>
  );
};

export default ProfileHome;
