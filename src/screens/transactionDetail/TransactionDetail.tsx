// import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
// import React from 'react';
// import DetailPageHeader from '../../components/DetailsPageHeader';
// import AppButton from '../../components/AppButton';
// import {useRoute} from '@react-navigation/native';
// import useTransactionDetail from './useTransactionDetail';

// interface TransactionDetailParams {
//   TransactionDetail: {
//     docId: string;
//     category: string;
//     description: string;
//     money: string;
//     transactionType: string;
//     imageUrl: string;
//     timestamp: string;
//   };
// }

// const TransactionDetail: React.FC = () => {
//   const route = useRoute();

//   const {handleDelete, handleEdit} = useTransactionDetail();

//   const {
//     docId,
//     category,
//     description,
//     money,
//     transactionType,
//     imageUrl,
//     timeStamp,
//   } = route.params;
//   console.log('imageUrl', imageUrl);
//   return (
//     <View style={styles.container}>
//       <View
//         style={[
//           styles.UpperContainer,
//           {
//             backgroundColor:
//               transactionType === 'Expense' ? '#FD3C4A' : '#00A86B',
//           },
//         ]}>
//         <DetailPageHeader onPress={()=>handleDelete(transactionType,docId)} />
//         <View style={styles.UpperContainerText}>
//           <Text style={styles.uppercontainerCashText}>${money}</Text>
//           <Text style={styles.uppercontainerHeadingText}>Buy Some Grocery</Text>
//           <Text style={styles.upperContainerDateText}>{timeStamp}</Text>
//         </View>
//         <View style={styles.CategoryContainer}>
//           <View>
//             <Text>Type</Text>
//             <TextInput>{transactionType}</TextInput>
//           </View>
//           <View>
//             <Text>category</Text>
//             <TextInput>{category}</TextInput>
//           </View>
//           <View>
//             <Text>Wallet</Text>
//             <TextInput>Wallet</TextInput>
//           </View>
//         </View>
//       </View>
//       <View
//         style={{
//           borderBottomColor: 'black',
//           borderBottomWidth: StyleSheet.hairlineWidth,
//         }}
//       />
//       <View style={styles.lowerContainer}>
//         <Text style={styles.lowerContainerHeading}>Description</Text>
//         <Text>{description}</Text>
//         <Text style={styles.lowerContainerHeading}>Attachment</Text>
//         <View style={styles.preview}>
//           <Image style={styles.image} source={{uri: `${imageUrl}`}} />
//         </View>
//         <AppButton onPress={handleEdit} title="Edit" />
//       </View>
//     </View>
//   );
// };

// export default TransactionDetail;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     height: 116,
//     width: 116,
//   },
//   UpperContainer: {
//     backgroundColor: '#FD3C4A',
//     padding: 16,
//     flex: 2,
//     borderBottomEndRadius: 16,
//     borderBottomStartRadius: 16,
//     position: 'relative',
//   },
//   UpperContainerText: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   uppercontainerCashText: {
//     fontSize: 48,
//     fontWeight: '700',
//     color: 'white',
//   },
//   uppercontainerHeadingText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: 'white',
//     marginVertical: 8,
//   },
//   upperContainerDateText: {
//     fontSize: 13,
//     fontWeight: '500',
//     color: 'white',
//   },
//   lowerContainer: {
//     flex: 4,
//     padding: 16,
//   },
//   CategoryContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignContent: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 16,
//     backgroundColor: 'gray',
//     marginHorizontal: 16,
//     width: '100%',
//     alignSelf: 'center',
//     borderRadius: 16,
//     position: 'absolute',
//     bottom: 0,
//     marginTop: 50,
//   },
//   preview: {
//     width: '100%',
//     height: 116,
//     borderRadius: 16,
//     backgroundColor: '#7F3DFF',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   lowerContainerHeading: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginVertical: 8,
//   },
// });

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import DetailPageHeader from '../../components/DetailsPageHeader';
import AppButton from '../../components/AppButton';
import {useRoute} from '@react-navigation/native';
import useTransactionDetail from './useTransactionDetail';

interface TransactionDetailParams {
  TransactionDetail: {
    docId: string;
    category: string;
    description: string;
    money: string;
    transactionType: string;
    imageUrl: string;
    timestamp: string;
  };
}

const TransactionDetail: React.FC = () => {
  const route = useRoute();
  const {handleDelete, handleEdit} = useTransactionDetail();
  const {
    docId,
    category,
    description,
    money,
    transactionType,
    imageUrl,
    timestamp,
  } = route.params;
  const [editableCategory, setEditableCategory] = useState(category);
  const [editableTransactionType, setEditableTransactionType] =
    useState(transactionType);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={[
            styles.UpperContainer,
            {
              backgroundColor:
                transactionType === 'Expense' ? '#FD3C4A' : '#00A86B',
            },
          ]}>
          <DetailPageHeader
            onPress={() => handleDelete(transactionType, docId)}
          />
          <View style={styles.UpperContainerText}>
            <TextInput style={styles.uppercontainerCashText}>
              ${money}
            </TextInput>
            <TextInput style={styles.uppercontainerHeadingText}>
              Buy Some Grocery
            </TextInput>
            <Text style={styles.upperContainerDateText}>{timestamp}</Text>
          </View>
          <View style={styles.CategoryContainer}>
            <View>
              <Text>Type</Text>
              <TextInput
                value={editableTransactionType}
                onChangeText={setEditableTransactionType}
                editable={true}
              />
            </View>
            <View>
              <Text>Category</Text>
              <TextInput
                value={editableCategory}
                onChangeText={setEditableCategory}
                editable={true}
              />
            </View>
            <View>
              <Text>Wallet</Text>
              <TextInput value="Wallet" editable={false} />
            </View>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <Text style={styles.lowerContainerHeading}>Description</Text>
          <Text>{description}</Text>
          <Text style={styles.lowerContainerHeading}>Attachment</Text>
          <View style={styles.preview}>
            <Image style={styles.image} source={{uri: `${imageUrl}`}} />
          </View>
          <AppButton onPress={handleEdit} title="Edit" />
        </View>
      </ScrollView>
    </View>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 116,
    width: 116,
  },
  UpperContainer: {
    backgroundColor: '#FD3C4A',
    padding: 16,
    flex: 2,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    position: 'relative',
  },
  UpperContainerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uppercontainerCashText: {
    fontSize: 48,
    fontWeight: '700',
    color: 'white',
  },
  uppercontainerHeadingText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginVertical: 8,
  },
  upperContainerDateText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'white',
  },
  lowerContainer: {
    flex: 4,
    padding: 16,
  },
  CategoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: 'gray',
    marginHorizontal: 16,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 16,
    position: 'absolute',
    bottom: 0,
    marginTop: 50,
  },
  preview: {
    width: '100%',
    height: 116,
    borderRadius: 16,
    backgroundColor: '#7F3DFF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerContainerHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
  },
});
