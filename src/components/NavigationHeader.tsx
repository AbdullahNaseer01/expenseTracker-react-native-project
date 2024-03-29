import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

interface NavigationHeaderProps {
  title: string;
  headerStyle?: ViewStyle & { textColor?: string }; // Extend ViewStyle with textColor property
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ title, headerStyle }) => {
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object

  const handleBack = () => {
    navigation.goBack(); // Navigate back when the arrow button is pressed
  };

  return (
    <View style={[styles.container, headerStyle]}>
      <View style={styles.navigationHeader}>
        <TouchableOpacity style={styles.arrowButton} onPress={handleBack}>
          <Image source={require('../assets/arrow.png')} />
        </TouchableOpacity>
        <View style={styles.centerView}>
          <Text style={[styles.headerText, { color: headerStyle?.textColor }]}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  arrowButton: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
