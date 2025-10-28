import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchTransactionsApi, updateTransactionApi } from '../services/api';
import type { Transaction } from '../types';
import type { RootState } from './store';
import type { TransactionUpdateData } from '../services/api';

interface TransactionsState {
  items: Transaction[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TransactionsState = {
  items: [],
  loading: 'idle',
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (accountId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('No token found');
      }
      const transactions = await fetchTransactionsApi(token, accountId);
      return transactions;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async (
    { transactionId, data }: { transactionId: string; data: TransactionUpdateData },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('No token found');
      }
      const updatedTransaction = await updateTransactionApi(token, transactionId, data);
      return updatedTransaction;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
        state.items = [];
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateTransaction.pending, (state) => {
        // Optionally show spinner for specific transaction
      })
      .addCase(updateTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        const index = state.items.findIndex((tx) => tx.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default transactionsSlice.reducer;