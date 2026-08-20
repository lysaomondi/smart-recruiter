import api from './api';

export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (userData) => api.post('/auth/register', userData);
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const authService = {
  login: loginUser,
  register: registerUser,
  logout: () => {
    logoutUser();
    return Promise.resolve();
  },
};

export default authService;
