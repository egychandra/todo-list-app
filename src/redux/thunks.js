import { 
  getAllChecklists,
  createChecklist,
  deleteChecklist,
  getChecklistItems,
  createChecklistItem,
  getChecklistItem,
  deleteChecklistItem,
  updateChecklistItemStatus,
  renameChecklistItem
} from '../api/checklist';
import { 
  fetchChecklistsStart,
  fetchChecklistsSuccess,
  createChecklistSuccess,
  deleteChecklistSuccess,
  fetchItemsStart,
  fetchItemsSuccess,
  createItemSuccess,
  deleteItemSuccess,
  updateItemSuccess,
  resetLoading,
  setError
} from './slices/checklistSlice';

const handleThunkError = (error, dispatch, actionType) => {
  console.error(`${actionType} error:`, error);
  const errorMessage = error.message || `Failed to ${actionType.toLowerCase()}`;
  dispatch(setError(errorMessage));
  setTimeout(() => dispatch(resetLoading()), 3000);
};

export const fetchChecklists = (token) => async (dispatch) => {
  try {
    dispatch(fetchChecklistsStart());
    const data = await getAllChecklists(token);
    dispatch(fetchChecklistsSuccess(data));
  } catch (error) {
    handleThunkError(error, dispatch, 'Fetch checklists');
  }
};

export const createNewChecklist = (name, token) => async (dispatch) => {
  try {
    dispatch(fetchChecklistsStart());
    const data = await createChecklist(name, token);
    dispatch(createChecklistSuccess(data));
  } catch (error) {
    handleThunkError(error, dispatch, 'Create checklist');
  }
};

export const deleteExistingChecklist = (checklistId, token) => async (dispatch) => {
  try {
    dispatch(fetchChecklistsStart());
    await deleteChecklist(checklistId, token);
    dispatch(deleteChecklistSuccess(checklistId));
  } catch (error) {
    handleThunkError(error, dispatch, 'Delete checklist');
  }
};

export const fetchItems = (checklistId, token) => async (dispatch) => {
  try {
    dispatch(fetchItemsStart());
    const data = await getChecklistItems(checklistId, token);
    dispatch(fetchItemsSuccess(data));
  } catch (error) {
    handleThunkError(error, dispatch, 'Fetch items');
  }
};

export const createNewItem = (checklistId, itemName, token) => async (dispatch) => {
  try {
    dispatch(fetchItemsStart());
    const data = await createChecklistItem(checklistId, itemName, token);
    dispatch(createItemSuccess(data));
  } catch (error) {
    handleThunkError(error, dispatch, 'Create item');
  }
};

export const getItemDetails = (checklistId, itemId, token) => async (dispatch) => {
  try {
    dispatch(fetchItemsStart());
    const data = await getChecklistItem(checklistId, itemId, token);
    return data;
  } catch (error) {
    handleThunkError(error, dispatch, 'Get item details');
    throw error;
  }
};

export const deleteItem = (checklistId, itemId, token) => async (dispatch) => {
  try {
    dispatch(fetchItemsStart());
    await deleteChecklistItem(checklistId, itemId, token);
    dispatch(deleteItemSuccess(itemId));
  } catch (error) {
    handleThunkError(error, dispatch, 'Delete item');
  }
};

export const toggleItemStatus = (checklistId, itemId, token) => async (dispatch) => {
  try {
    dispatch(fetchItemsStart());
    const data = await updateChecklistItemStatus(checklistId, itemId, token);
    dispatch(updateItemSuccess(data));
  } catch (error) {
    handleThunkError(error, dispatch, 'Toggle item status');
  }
};

export const renameItem = (checklistId, itemId, newName, token) => async (dispatch) => {
  try {
    dispatch(fetchItemsStart());
    const data = await renameChecklistItem(checklistId, itemId, newName, token);
    dispatch(updateItemSuccess(data));
  } catch (error) {
    handleThunkError(error, dispatch, 'Rename item');
  }
};