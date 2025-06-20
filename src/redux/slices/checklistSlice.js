import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checklists: [],
  currentChecklist: null,
  items: [],
  loading: false,
  error: null
};

const checklistSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {
    fetchChecklistsStart(state) {
      state.loading = true;
      state.error = null;
      state.checklists = [];
    },
    fetchChecklistsSuccess(state, action) {
      state.checklists = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchChecklistsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.checklists = [];
    },
    createChecklistSuccess(state, action) {
      state.checklists.push(action.payload);
      state.loading = false;
    },
    deleteChecklistSuccess(state, action) {
      state.checklists = state.checklists.filter(
        checklist => checklist.id !== action.payload
      );
      state.loading = false;
    },
    fetchItemsStart(state) {
      state.loading = true;
    },
    fetchItemsSuccess(state, action) {
      state.items = action.payload;
      state.loading = false;
    },
    createItemSuccess(state, action) {
      state.items.push(action.payload);
      state.loading = false;
    },
    deleteItemSuccess(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.loading = false;
    },
    updateItemSuccess(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.loading = false;
    },
    resetLoading(state) {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  fetchChecklistsStart,
  fetchChecklistsSuccess,
  fetchChecklistsFailure,
  createChecklistSuccess,
  deleteChecklistSuccess,
  fetchItemsStart,
  fetchItemsSuccess,
  createItemSuccess,
  deleteItemSuccess,
  updateItemSuccess,
  resetLoading,
  setError
} = checklistSlice.actions;

export default checklistSlice.reducer;