import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  profileHeader: {
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  UserProfile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#7F3DFF',
    alignItems: 'center', // Align items to the top center
    justifyContent: 'center', // Center items horizontally
  },
  ProfileImage: {
    height: '100%', // Adjusted to be 100% of the container height
    width: '100%', // Adjusted to be 100% of the container width
    borderRadius: 40, // Fully rounded image
  },
  usernameText: {
    fontSize: 14,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  ProfileText: {
    marginLeft: 16,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    // backgroundColor:"red"
  },
  card: {
    // height: '70%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 24,
  },
  actionImage: {
    height: 52,
    width: 52,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 9,
    color: 'black',
  },
  actionImgContainer: {},
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 17,
  },
});
