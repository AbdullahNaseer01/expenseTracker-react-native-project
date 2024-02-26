// // import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // import { db } from '../config/firebase';
// // import auth from '@react-native-firebase/auth';
// // import { useEffect } from 'react';

// // interface Transaction {
// //   // Define properties of the transaction object here
// // }

// // // Action
// // export const fetchTransactions = createAsyncThunk<Transaction[]>(
// //   'transactions/fetchTransactions',
// //   async () => {
// //     const userEmail: string = auth().currentUser?.email || '';
// //     const incomeRes = await db
// //       .collection('users')
// //       .doc(`${userEmail}`)
// //       .collection('Income')
// //       .get();
// //     const incomeData = incomeRes.docs.map(doc => doc.data());

// //     const expenseRes = await db
// //       .collection('users')
// //       .doc(`${userEmail}`)
// //       .collection('Expense')
// //       .get();
// //     const expenseData = expenseRes.docs.map(doc => doc.data());

// //     // Combine income and expense data
// //     const allTransactions = [...incomeData, ...expenseData];

// //     return allTransactions;
// //   },
// // );

// // // Create the transaction slice
// // export const transactionSlice = createSlice({
// //   name: 'transactions',
// //   initialState: {
// //     transactions: [] as Transaction[],
// //     isLoading: false,
// //     isError: false,
// //   },
// //   reducers: {},
// //   extraReducers: builder => {
// //     builder
// //       .addCase(fetchTransactions.pending, state => {
// //         state.isLoading = true;
// //         state.isError = false;
// //       })
// //       .addCase(fetchTransactions.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.transactions = action.payload;
// //         console.log(action.payload);
// //       })
// //       .addCase(fetchTransactions.rejected, state => {
// //         state.isLoading = false;
// //         state.isError = true;
// //       });
// //   },
// // });

// // // Export actions and reducer
// // export const {} = transactionSlice.actions;
// // export default transactionSlice.reducer;


// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { db } from '../config/firebase';
// import auth from '@react-native-firebase/auth';
// import { useEffect } from 'react';

// interface Transaction {
//   // Define properties of the transaction object here
// }

// // Action
// export const fetchTransactions = createAsyncThunk<Transaction[]>(
//   'transactions/fetchTransactions',
//   async () => {
//     const userEmail: string = auth().currentUser?.email || '';
    
//     return new Promise<Transaction[]>((resolve, reject) => {
//       const unsubscribeIncome = db
//         .collection('users')
//         .doc(userEmail)
//         .collection('Income')
//         .onSnapshot(incomeSnapshot => {
//           const incomeData = incomeSnapshot.docs.map(doc => doc.data());
//           unsubscribeIncome();
          
//           const unsubscribeExpense = db
//             .collection('users')
//             .doc(userEmail)
//             .collection('Expense')
//             .onSnapshot(expenseSnapshot => {
//               const expenseData = expenseSnapshot.docs.map(doc => doc.data());
//               unsubscribeExpense();
              
//               const allTransactions = [...incomeData, ...expenseData];
//               resolve(allTransactions);
//             }, error => {
//               reject(error);
//             });
//         }, error => {
//           reject(error);
//         });
//     });
//   },
// );

// // Create the transaction slice
// export const transactionSlice = createSlice({
//   name: 'transactions',
//   initialState: {
//     transactions: [] as Transaction[],
//     isLoading: false,
//     isError: false,
//   },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchTransactions.pending, state => {
//         state.isLoading = true;
//         state.isError = false;
//       })
//       .addCase(fetchTransactions.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.transactions = action.payload;
//       })
//       .addCase(fetchTransactions.rejected, state => {
//         state.isLoading = false;
//         state.isError = true;
//       });
//   },
// });

// // Export actions and reducer
// export const {} = transactionSlice.actions;
// export default transactionSlice.reducer;



import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../config/firebase';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';

interface Transaction {
  // Define properties of the transaction object here
}

// Action
export const fetchTransactions = createAsyncThunk<Transaction[]>(
  'transactions/fetchTransactions',
  async () => {
    const userEmail: string = auth().currentUser?.email || '';
    
    return new Promise<Transaction[]>((resolve, reject) => {
      const unsubscribeIncome = db
        .collection('users')
        .doc(userEmail)
        .collection('Income')
        .onSnapshot(incomeSnapshot => {
          const incomeData = incomeSnapshot.docs.map(doc => doc.data());
          
          const unsubscribeExpense = db
            .collection('users')
            .doc(userEmail)
            .collection('Expense')
            .onSnapshot(expenseSnapshot => {
              const expenseData = expenseSnapshot.docs.map(doc => doc.data());
              
              const allTransactions = [...incomeData, ...expenseData];
              resolve(allTransactions);
            }, error => {
              reject(error);
            });
        }, error => {
          reject(error);
        });
        
        // Return a function to unsubscribe when needed (not used in this case)
        return () => {
          unsubscribeIncome();
        };
    });
  },
);

// Create the transaction slice
export const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [] as Transaction[],
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// Export actions and reducer
export const {} = transactionSlice.actions;
export default transactionSlice.reducer;
