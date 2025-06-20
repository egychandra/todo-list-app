import api from './index';

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    
    if (response.data && (response.data.token || response.data.data?.token)) {
      return {
        token: response.data.token || response.data.data.token,
        username
      };
    }
    
    if (response.data?.message) {
      throw new Error(response.data.message);
    }
    
    throw new Error('Login failed: Invalid server response');
    
  } catch (error) {
    console.error("Login Error:", error);
    
    let errorMessage = 'Login failed. Please try again.';
    
    if (error.response) {
      if (error.response.data?.errorMessage) {
        errorMessage = error.response.data.errorMessage;
      } else if (error.response.status === 401) {
        errorMessage = 'Invalid username or password';
      } else if (error.response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
    } else if (error.request) {
      errorMessage = 'No response from server. Check your connection.';
    } else {
      errorMessage = error.message || 'Login failed. Please try again.';
    }
    
    throw new Error(errorMessage);
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post('/register', {
      username,
      email, 
      password
    }, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.data?.statusCode === 401) {
      throw new Error(response.data.errorMessage || 'Registration failed');
    }

    return {
      token: response.data?.token,
      username: response.data?.username || username
    };
  } catch (error) {
    console.error("Registration Error:", error);
    
    let errorMessage = 'Registration failed. Please try again.';
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timed out. Server might be busy.';
    } else if (error.message.includes('Network Error')) {
      errorMessage = 'Cannot connect to server. Check your internet connection.';
    } else if (error.response?.data?.errorMessage) {
      errorMessage = error.response.data.errorMessage;
    }
    
    throw new Error(errorMessage);
  }
};