import api from './index';

export const getAllChecklists = async (token) => {
  try {
    const response = await api.get('/checklist', {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!response.data || !response.data.data) {
      console.warn('Unexpected response structure:', response);
      return [];
    }
    
    return response.data.data;
  } catch (error) {
    console.error('API Error in getAllChecklists:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch checklists');
  }
};

export const createChecklist = async (name, token) => {
  try {
    const response = await api.post('/checklist', { name }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!response.data || !response.data.data) {
      console.warn('Unexpected response structure:', response);
      throw new Error('Invalid server response');
    }
    
    return response.data.data;
  } catch (error) {
    console.error('API Error in createChecklist:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to create checklist');
  }
};

export const deleteChecklist = async (checklistId, token) => {
  try {
    const response = await api.delete(`/checklist/${checklistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!response.data || !response.data.data) {
      console.warn('Unexpected response structure:', response);
      throw new Error('Invalid server response');
    }
    
    return response.data.data;
  } catch (error) {
    console.error('API Error in deleteChecklist:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to delete checklist');
  }
};

export const getChecklistItems = async (checklistId, token) => {
  try {
    const response = await api.get(`/checklist/${checklistId}/item`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!response.data) {
      console.warn('Unexpected response structure:', response);
      return [];
    }
    
    return response.data.data || response.data;
  } catch (error) {
    console.error('API Error in getChecklistItems:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch items');
  }
};

export const createChecklistItem = async (checklistId, itemName, token) => {
  try {
    const response = await api.post(
      `/checklist/${checklistId}/item`,
      { itemName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    if (!response.data) {
      console.warn('Unexpected response structure:', response);
      throw new Error('Invalid server response');
    }
    
    return response.data.data || response.data;
  } catch (error) {
    console.error('API Error in createChecklistItem:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to create item');
  }
};

export const getChecklistItem = async (checklistId, itemId, token) => {
  try {
    const response = await api.get(`/checklist/${checklistId}/item/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!response.data) {
      console.warn('Unexpected response structure:', response);
      throw new Error('Invalid server response');
    }
    
    return response.data.data || response.data;
  } catch (error) {
    console.error('API Error in getChecklistItem:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch item');
  }
};

export const updateChecklistItemStatus = async (checklistId, itemId, token) => {
  try {
    const response = await api.put(
      `/checklist/${checklistId}/item/${itemId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    if (!response.data) {
      console.warn('Unexpected response structure:', response);
      throw new Error('Invalid server response');
    }
    
    return response.data.data || response.data;
  } catch (error) {
    console.error('API Error in updateChecklistItemStatus:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to update item status');
  }
};

export const deleteChecklistItem = async (checklistId, itemId, token) => {
  try {
    const response = await api.delete(`/checklist/${checklistId}/item/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!response.data) {
      console.warn('Unexpected response structure:', response);
      throw new Error('Invalid server response');
    }
    
    return response.data.data || response.data;
  } catch (error) {
    console.error('API Error in deleteChecklistItem:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to delete item');
  }
};

export const renameChecklistItem = async (checklistId, itemId, itemName, token) => {
  try {
    const response = await api.put(
      `/checklist/${checklistId}/item/rename/${itemId}`,
      { itemName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    if (!response.data) {
      console.warn('Unexpected response structure:', response);
      throw new Error('Invalid server response');
    }
    
    return response.data.data || response.data;
  } catch (error) {
    console.error('API Error in renameChecklistItem:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to rename item');
  }
};

export const getChecklistItemDetail = async (checklistId, itemId, token) => {
  try {
    const response = await api.get(`/checklist/${checklistId}/item/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!response.data) {
      console.warn('Unexpected response structure:', response);
      throw new Error('Invalid server response');
    }
    
    return response.data.data || response.data;
  } catch (error) {
    console.error('API Error in getChecklistItemDetail:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to get item details');
  }
};