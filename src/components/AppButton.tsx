import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {AppButtonProps} from '../types/types';

const AppButton: React.FC<AppButtonProps> = ({title,onPress,disabled}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.container}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7F3DFF',
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    // borderWidth: 1,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
