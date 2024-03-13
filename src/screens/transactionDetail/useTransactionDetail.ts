import {Alert} from 'react-native';
import {db} from '../../config/firebase';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
} from '../../store/slices/transactionsSlice';
import storage from '@react-native-firebase/storage';
import {TransactionInterface} from '../../types/types';
import Navigation from '../../navigation/Navigation';
import {useNavigation} from '@react-navigation/native';

import {TransactionDetailHook} from '../../types/types';

const useTransactionDetail = (
  transactionData: TransactionInterface,
): TransactionDetailHook => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [editableCategory, setEditableCategory] = useState<string>(
    transactionData.category,
  );
  const [editableTransactionType, setEditableTransactionType] =
    useState<string>(transactionData.transactionType);
  const [editableDescription, setEditableDescription] = useState<string>(
    transactionData.description,
  );
  const [editableMoney, setEditableMoney] = useState<string>(
    transactionData.money,
  );
  const [typeModalVisible, setTypeModalVisible] = useState<boolean>(false);
  const [categoryModalVisible, setCategoryModalVisible] =
    useState<boolean>(false);
  const transactionTypes: string[] = ['Expense', 'Income'];
  const [confirmAlert, setConfirmAlert] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleDelete = async (): Promise<void> => {
    try {
      dispatch(deleteTransaction(transactionData) as any);
      setAlertMessage('Transaction Deleted Successfully');
      setAlert(true);
      setConfirmAlert(false);
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };
  const handleEdit = async (): Promise<void> => {
    try {
      const updatedTransactionData = {
        id: transactionData.docId,
        description: editableDescription,
        category: editableCategory,
        money: editableMoney,
        transactionType: editableTransactionType,
        imageUrl: transactionData.imageUrl,
      };
      dispatch(editTransaction(updatedTransactionData) as any);
      setAlertMessage('Transaction updated Successfully');
      setAlert(true);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleCancelDelete = () => {
    setConfirmAlert(false);
  };

  return {
    handleDelete,
    handleEdit,
    editableCategory,
    setEditableCategory,
    editableTransactionType,
    setEditableTransactionType,
    editableDescription,
    setEditableDescription,
    editableMoney,
    setEditableMoney,
    typeModalVisible,
    setTypeModalVisible,
    categoryModalVisible,
    setCategoryModalVisible,
    transactionTypes,
    handleCancelDelete,
    confirmAlert,
    setConfirmAlert,
    alert,
    setAlert,
    alertMessage,
  };
};

export default useTransactionDetail;
