// import {
//   createAsyncThunk,
//   createSlice,
//   PayloadAction,
//   Dispatch,
// } from '@reduxjs/toolkit';
// import auth from '@react-native-firebase/auth';
// import {db} from '../../config/firebase';
// import storage from '@react-native-firebase/storage';
// import {ToastAndroid} from 'react-native';

// interface UserState {
//   user: auth.User | null;
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   user: null,
//   isLoading: false,
//   error: null,
// };

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<auth.User | null>) => {
//       state.user = action.payload;
//       state.isLoading = false;
//       state.error = null;
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.isLoading = action.payload;
//       state.error = null;
//     },
//     setError: (state, action: PayloadAction<string>) => {
//       state.error = action.payload;
//       state.isLoading = false;
//     },
//     setProfileImage: (state, action: PayloadAction<string>) => {
//       if (state.user) {
//         state.user.profileImage = action.payload;
//       }
//     },
//   },
// });

// export const {setUser, setLoading, setError, setProfileImage} =
//   userSlice.actions;

// export const updateUserProfile =
//   (userData: {displayName?: string; email?: string; profileImage?: string}) =>
//   async (dispatch: Dispatch<any>) => {
//     dispatch(setLoading(true));
//     try {
//       const currentUser = auth().currentUser;
//       if (!currentUser) {
//         throw new Error('No current user found');
//       }
//       const {displayName, email, profileImage} = userData;
//       const updates: any = {};
//       if (displayName) updates.displayName = displayName;
//       if (email) updates.email = email;
//       if (profileImage) updates.profileImage = profileImage;

//       await db.collection('users').doc(currentUser.uid).update(updates);
//       dispatch(setUser(updates));
//       ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
//       return updates;
//     } catch (error: any) {
//       console.error('Error updating user data:', error);
//       dispatch(setError(error.message));
//       ToastAndroid.show(
//         `Error updating profile: ${error.message}`,
//         ToastAndroid.SHORT,
//       );
//       throw error;
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

// export const uploadProfileImage =
//   (image: any) => async (dispatch: Dispatch<any>) => {
//     dispatch(setLoading(true));
//     try {
//       const currentUser = auth().currentUser;
//       if (!currentUser) {
//         throw new Error('No current user found');
//       }
//       const imageRef = storage().ref(`/images/${currentUser.uid}/profileImage`);
//       await imageRef.putFile(image.path);
//       const downloadURL = await imageRef.getDownloadURL();
//       await dispatch(updateUserProfile({profileImage: downloadURL}));
//       dispatch(setProfileImage(downloadURL));
//       ToastAndroid.show(
//         'Profile image uploaded successfully!',
//         ToastAndroid.SHORT,
//       );
//     } catch (error: any) {
//       // console.error('Error uploading profile image:', error);
//       dispatch(setError(error.message));
//       ToastAndroid.show(
//         `Error uploading profile image: ${error.message}`,
//         ToastAndroid.SHORT,
//       );
//       throw error;
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

// export const fetchUserData = () => async (dispatch: Dispatch<any>) => {
//   dispatch(setLoading(true));
//   try {
//     const currentUser = auth().currentUser;
//     if (currentUser) {
//       const userDoc = await db.collection('users').doc(currentUser.uid).get();
//       if (userDoc.exists) {
//         const userData = userDoc.data();
//         if (userData) {
//           dispatch(
//             setUser({
//               displayName: userData.displayName,
//               email: userData.email,
//               uid: currentUser.uid,
//               profileImage: userData.profileImage,
//             }),
//           );
//         }
//       } else {
//         dispatch(setError('User data not found in Firestore'));
//       }
//     } else {
//       dispatch(setError('No current user found'));
//     }
//   } catch (error: any) {
//     // console.error('Error fetching user data:', error);
//     dispatch(setError(error.message));
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// export default userSlice.reducer;


import {
  createAsyncThunk,
  createSlice,
  Dispatch,
} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import { db } from '../../config/firebase';
import storage from '@react-native-firebase/storage';
import { ToastAndroid } from 'react-native';

interface UserState {
  user: auth.User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData: { displayName?: string; email?: string; profileImage?: string }, { dispatch }) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error('No current user found');
      }
      const { displayName, email, profileImage } = userData;
      const updates: any = {};
      if (displayName) updates.displayName = displayName;
      if (email) updates.email = email;
      if (profileImage) updates.profileImage = profileImage;

      await db.collection('users').doc(currentUser.uid).update(updates);
      dispatch(setUser(updates));
      ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
      return updates;
    } catch (error: any) {
      console.error('Error updating user data:', error);
      ToastAndroid.show(`Error updating profile: ${error.message}`, ToastAndroid.SHORT);
      throw error;
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  'user/uploadProfileImage',
  async (image: any, { dispatch }) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error('No current user found');
      }
      const imageRef = storage().ref(`/images/${currentUser.uid}/profileImage`);
      await imageRef.putFile(image.path);
      const downloadURL = await imageRef.getDownloadURL();
      await dispatch(updateUserProfile({ profileImage: downloadURL }));
      ToastAndroid.show('Profile image uploaded successfully!', ToastAndroid.SHORT);
      return downloadURL;
    } catch (error: any) {
      console.error('Error uploading profile image:', error);
      ToastAndroid.show(`Error uploading profile image: ${error.message}`, ToastAndroid.SHORT);
      throw error;
    }
  }
);

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { dispatch }) => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          if (userData) {
            dispatch(
              setUser({
                displayName: userData.displayName,
                email: userData.email,
                uid: currentUser.uid,
                profileImage: userData.profileImage,
              })
            );
          }
        } else {
          throw new Error('User data not found in Firestore');
        }
      } else {
        throw new Error('No current user found');
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setProfileImage: (state, action) => {
      if (state.user) {
        state.user.profileImage = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(uploadProfileImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUser, setLoading, setError, setProfileImage } = userSlice.actions;

export default userSlice.reducer;
