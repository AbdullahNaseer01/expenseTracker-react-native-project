import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';
import AppButton from '../../components/AppButton';
import AttachmentInputPopUp from '../../components/AttachmentInputPopUp';
import useTransactionForm from './useCreateTransaction';
import NavigationHeader from '../../components/NavigationHeader';
import Alert from '../../components/Alert';
import CategorySelectModal from '../../components/CategorySelectModal';



const CreateTransaction: React.FC = () => {
  const {
    categories,
    category,
    description,
    modalVisible,
    fileModalVisible,
    selectCategory,
    toggleFileModal,
    handleOutsidePress,
    setDescription,
    setCategory,
    setModalVisible,
    setFileModalVisible,
    money,
    setMoney,
    handleImageThrougGallery,
    handleImageThroughCamera,
    handleSubmit,
    transactionType,
    setTransactionType,
    image,
    setImage,
    toggleCategoryModal,
    loading,
    setLoading,
    alert,
    setAlert,
  } = useTransactionForm();

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View
          style={[
            styles.container,
            {
              backgroundColor:
                transactionType === 'Expense' ? '#FD3C4A' : '#00A86B',
            },
          ]}>
          <NavigationHeader
            title={transactionType}
            headerStyle={{textColor: 'white'}}
          />
          {/* Add buttons to toggle between Expense and Income */}
          <View style={styles.toggleButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                transactionType === 'Expense' && styles.activeButton,
              ]}
              onPress={() => setTransactionType('Expense')}>
              <Text style={styles.toggleButtonText}>Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                transactionType === 'Income' && styles.activeButton,
              ]}
              onPress={() => setTransactionType('Income')}>
              <Text style={styles.toggleButtonText}>Income</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.displayContainer}>
            <Text style={styles.displayContainerHeading}>How Much?</Text>
            <TextInput
              style={[styles.displayContainerCash, styles.inputStyle]}
              placeholder="$0"
              keyboardType="numeric"
              placeholderTextColor={'white'}
              value={money}
              onChangeText={text => setMoney(text)}
            />
          </View>
          <View
            style={[styles.inputContainer, {flex: fileModalVisible ? 5 : 2}]}>
            <View>
              <TouchableOpacity
                style={styles.textInput}
                onPress={() => setModalVisible(true)}>
                <Text>{category || 'Select Category'}</Text>
              </TouchableOpacity>
              <CategorySelectModal
                modalVisible={modalVisible}
                onRequestClose={toggleCategoryModal}
                image={categories} // Assuming categories is an array of category objects
                onPress={selectCategory}
              />

              <TextInput
                style={styles.textInput}
                placeholder="Description"
                value={description}
                onChangeText={text => setDescription(text)}
              />
              {!image && (
                <TouchableOpacity
                  style={styles.fileInput}
                  onPress={toggleFileModal}>
                  <Text>Attachment</Text>
                </TouchableOpacity>
              )}
              {image && (
                <View style={styles.ImagePreviewContainer}>
                  <TouchableOpacity
                    onPress={() => setImage(null)}
                    style={styles.imageRemoveBtn}>
                    <Text style={styles.imageRemoveBtnText}>X</Text>
                  </TouchableOpacity>
                  <Image
                    style={styles.previewImage}
                    source={{uri: image.path}}
                  />
                </View>
              )}

              <Modal
                animationType="fade"
                transparent={true}
                visible={fileModalVisible}
                onRequestClose={toggleFileModal}>
                <TouchableWithoutFeedback onPress={handleOutsidePress}>
                  <View style={styles.fileModalContainer}>
                    <View style={styles.modalBackground} />
                    <View style={styles.attachmentPopup}>
                      <AttachmentInputPopUp
                        handleImageThrougGallery={handleImageThrougGallery}
                        handleImageThroughCamera={handleImageThroughCamera}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
            <View style={styles.continueButton}>
              <AppButton
                disabled={loading ? true : false}
                title={loading ? `Sending...` : `Continue`}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Alert
        message={'Transaction Added successfully'}
        visible={alert}
        onPress={() => setAlert(false)}
      />
    </ScrollView>
  );
};

export default CreateTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#FCFCFC',
  },
  activeButton: {
    backgroundColor: 'yellow',
  },
  toggleButtonText: {
    color: '#333',
  },
  displayContainer: {
    flex: 1,
    paddingTop: '10%',
    paddingHorizontal: 25,
  },
  displayContainerHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FCFCFC',
  },
  displayContainerCash: {
    fontSize: 64,
    fontWeight: '600',
    color: '#FCFCFC',
  },
  inputStyle: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: '#FCFCFC',
    fontSize: 64,
    fontWeight: '600',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  textInput: {
    height: 56,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'whitesmoke',
    paddingHorizontal: 10,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileInput: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  button: {
    margin: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  categoryItemContainer: {
    // borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    margin: 16,
  },
  categoryItemText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
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
  continueButton: {
    margin: 16,
  },
  ImagePreviewContainer: {
    height: 90,
    position: 'relative',
    width: 90,
    marginHorizontal: 16,
  },
  previewImage: {
    width: 90,
    height: 90,
  },
  imageRemoveBtn: {
    position: 'absolute',
    bottom: 70,
    left: 75,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00000052',
    borderWidth: 1,
    borderColor: 'whitesmoke',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  imageRemoveBtnText: {
    color: 'white',
  },
});
