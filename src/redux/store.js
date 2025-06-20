import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import checklistReducer from './slices/checklistSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    checklist: checklistReducer
  }
});