import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1, // Change to flex: 1
    margin: 16,
    position: 'relative',
  },
  profileView: {
    margin: 16,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderColor: '#AD00FF',
    borderWidth: 2,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 0,
    paddingLeft: 100,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 9,
    marginTop: 10,
    color: 'black',
  },
  textInputContainer: {
    width: '100%', // Ensure TextInput container takes full width
  },
  textInput: {
    width: '100%',
    height: 56,
    backgroundColor: 'whitesmoke', // Change background color to differentiate from editable inputs
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'whitesmoke',
    paddingHorizontal: 10,
    color: 'black',
  },
  updateProfileBtn: {
    position: 'absolute',
    bottom: 16, // Adjust button position to the bottom of the screen
    width: '100%',
  },
  fileModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  attachmentPopup: {
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 20,
  },
});
