export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface TransactionInterface {
  id: string;
  docId: string;
  category: string;
  description: string;
  money: string;
  transactionType: string;
  imageUrl: string;
  timestamp: string;
  imageId: any | null;
}

export interface financeSummary {
  balance: any;
  income: any;
  expenses: any;
}

export interface PasswordResetData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  handleResetPassword: () => void;
  setCurrentPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  setConfirmNewPassword: (value: string) => void;
}

export interface SignUp {
  displayName: string;
  email: string;
  password: string;
}

export interface SignIn {
  email: string;
  password: string;
}
export interface User {
  displayName: string;
  email: string;
}
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
export type UserData = {
  email: string;
  uid: string;
  displayName: string;
  photoUrl: string | null;
};

export interface User {
  displayName: string;
  email: string;
}

// Define types
export interface Category {
  id: number;
  name: string;
  image: any;
}
export interface TransactionData {
  description: string;
  category: string;
  money: string;
  imageUrl: string | null;
  transactionType: string;
  timestamp: string;
  imageId: any;
}

export interface alertProps {
  message: string;
  onPress: () => void;
  visible: boolean;
}

export interface AppButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

export interface FinancialCategoryGraphProps {
  category: string;
  color: string;
  style: object;
  styleamount: object;
  amount: number;
  image: any;
  transactionType: 'Expense' | 'Income';
}

export interface CategorySelectModalProps {
  modalVisible: boolean;
  onRequestClose: () => void;
  image: any;
  onPress: (name: string) => void;
}

export interface ConfirmAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onYesPress: () => void;
  onNoPress: () => void;
}

export interface detailPageHeaderProps {
  onPress: () => void;
}

export interface filterProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  handleFilterSelect: (filter: string) => void;
}

export interface FilterTransactionPopupProps {
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
  handleSortSelect: (sort: string) => void;
  selectedSort: any;
}

export interface GoogleLoginButtonProps {
  title: string;
  onPress: () => void;
}

export interface HeroSectionProps {
  financeSummary: financeSummary;
}

export interface HomeListProps {
  transactions: Array<any>;
  isError: boolean;
  isLoading: boolean;
}

export interface AttachmentInputPopUp {
  handleImageThrougGallery: void;
  handleImageThroughCamera: void;
}

export interface TransactionCardProps {
  id: string;
  category: string;
  description: string;
  money: string;
  transactionType: string;
  key: string;
  imageUrl: string;
  timeStamp: string;
  imageId: string;
}

export interface UpdateUserProps {
  displayName: string;
  email: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  updateError: string | null;
  handleUpdateProfile: () => void;
  isLoading: boolean;
  fileModalVisible: boolean;
  setFileModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggleFileModal: () => void;
  handleUpdateUserImg: (image: any) => void;
  handleImageThrougGallery: () => void;
  handleImageThroughCamera: () => void;
  handleAlertVisible: () => void;
  message: string;
  alertVisible: boolean;
  user: any;
  error: string | null;
}

export interface TransactionDetailHook {
  handleDelete: (transactionType: string, docId: string) => Promise<void>;
  handleEdit: () => Promise<void>;
  editableCategory: string;
  setEditableCategory: React.Dispatch<React.SetStateAction<string>>;
  editableTransactionType: string;
  setEditableTransactionType: React.Dispatch<React.SetStateAction<string>>;
  editableDescription: string;
  setEditableDescription: React.Dispatch<React.SetStateAction<string>>;
  editableMoney: string;
  setEditableMoney: React.Dispatch<React.SetStateAction<string>>;
  typeModalVisible: boolean;
  setTypeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  categoryModalVisible: boolean;
  setCategoryModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  transactionTypes: string[];
  setConfirmAlert: React.Dispatch<React.SetStateAction<boolean>>;
  confirmAlert: boolean;
  handleCancelDelete: any;
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  alertMessage: string;
}
