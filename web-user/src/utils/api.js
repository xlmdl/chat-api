import axios from 'axios';
import { store } from 'store/index';
import { LOGIN } from 'store/actions';
//import { showError } from './common';
export const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : '/'
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      store.dispatch({ type: LOGIN, payload: null });
      window.location.href = '/home';
    }

    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }

    //showError(error);
  }
);
