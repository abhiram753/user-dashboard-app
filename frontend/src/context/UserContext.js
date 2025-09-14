import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { userService } from '../services/userService';
import { toast } from 'react-toastify';

const UserContext = createContext();

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USERS: 'SET_USERS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM'
};

// Initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
  searchTerm: ''
};

// Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTIONS.SET_USERS:
      return { ...state, users: action.payload, loading: false, error: null };

    case ACTIONS.ADD_USER:
      return { 
        ...state, 
        users: [action.payload, ...state.users], 
        loading: false, 
        error: null 
      };

    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ),
        loading: false,
        error: null
      };

    case ACTIONS.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        loading: false,
        error: null
      };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };

    case ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };

    default:
      return state;
  }
};

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Fetch all users
  const fetchUsers = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await userService.getAllUsers();
      dispatch({ type: ACTIONS.SET_USERS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      toast.error('Failed to fetch users');
    }
  };

  // Create user
  const createUser = async (userData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await userService.createUser(userData);
      dispatch({ type: ACTIONS.ADD_USER, payload: response.data.data });
      toast.success('User created successfully');
      return response.data.data;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      toast.error('Failed to create user');
      throw error;
    }
  };

  // Update user
  const updateUser = async (id, userData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await userService.updateUser(id, userData);
      dispatch({ type: ACTIONS.UPDATE_USER, payload: response.data.data });
      toast.success('User updated successfully');
      return response.data.data;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      toast.error('Failed to update user');
      throw error;
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      await userService.deleteUser(id);
      dispatch({ type: ACTIONS.DELETE_USER, payload: id });
      toast.success('User deleted successfully');
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      toast.error('Failed to delete user');
    }
  };

  // Set search term
  const setSearchTerm = (term) => {
    dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  // Get filtered users based on search term
  const getFilteredUsers = () => {
    if (!state.searchTerm) return state.users;

    return state.users.filter(user =>
      user.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  };

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const value = {
    ...state,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    setSearchTerm,
    clearError,
    getFilteredUsers
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
