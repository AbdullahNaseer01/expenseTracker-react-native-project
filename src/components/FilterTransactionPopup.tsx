import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import AppButton from './AppButton';
import AttachmentInputPopUp from './AttachmentInputPopUp';

interface FilterTransactionPopupProps {
  handleCategorySelect: (category: string) => void;
  handleExpenseSelect: () => void;
  handleIncomeSelect: () => void;
  selectedCategory: string;
  selectedExpense: boolean;
  selectedIncome: boolean;
  setCategoryModalVisible: (visible: boolean) => void;
  categoryModelVisible: boolean;
  handleResetFilters: () => void;
  handleFilterTransaction: () => void;
}

const FilterTransactionPopup: React.FC<FilterTransactionPopupProps> = ({
  handleCategorySelect,
  handleExpenseSelect,
  handleIncomeSelect,
  selectedCategory,
  selectedExpense,
  selectedIncome,
  setCategoryModalVisible,
  categoryModelVisible,
  handleResetFilters,
  handleFilterTransaction,
}) => {
  const categories = [
    {id: 1, name: 'Food'},
    {id: 2, name: 'Transport'},
    {id: 3, name: 'Others'},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Reset Transaction</Text>
        <TouchableOpacity
          onPress={handleResetFilters}
          style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.headerText}>Filter by</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={handleIncomeSelect}
            style={[
              styles.filterButton,
              selectedIncome && {backgroundColor: '#EEE5FF'},
            ]}>
            <Text style={styles.headerButtonText}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleExpenseSelect}
            style={[
              styles.filterButton,
              selectedExpense && {backgroundColor: '#EEE5FF'},
            ]}>
            <Text style={styles.headerButtonText}>Expenses</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.headerText}>Sort by</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.headerButtonText}>Highest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.headerButtonText}>Lowest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.headerButtonText}>Newest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.headerButtonText}>Oldest</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.headerText}>Sort by</Text>
        <View>
          <TouchableOpacity
            style={styles.textInput}
            onPress={() => {
              setCategoryModalVisible(true);
            }}>
            <Text>{selectedCategory || 'Select Category'}</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={categoryModelVisible}>
            <View style={styles.modalContainer}>
              <FlatList
                data={categories}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.categoryItem}
                    onPress={() => handleCategorySelect(item.name)}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Modal>
        </View>
      </View>
      <AppButton onPress={handleFilterTransaction} title={'Apply'} />
    </View>
  );
};

export default FilterTransactionPopup;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'whitesmoke',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    height: '60%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#EEE5FF',
    borderRadius: 16,
  },
  headerButtonText: {
    color: '#7F3DFF',
  },
  filterContainer: {
    marginVertical: 16,
  },
  filterButton: {
    marginTop: 16,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    // backgroundColor: '#EEE5FF',
    borderRadius: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  categoryItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textInput: {
    height: 56,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'whitesmoke',
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
