// import { create } from 'zustand';
// import axios from 'axios';

// export const useAuthStore = create((set) => ({
//   user: null,
//   isAuthenticated: false,

//   login: async (email, password) => {
//     try {
//       const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });

//       set({ user: response.data.user, isAuthenticated: true });
//       console.log('Login successful:', response.data.user);
//     } catch (error) {
//       console.error('Login error:', error.response?.data?.message || error.message);
//       alert(error.response?.data?.message || 'Error logging in');
//     }
//   },

//   signup: async (name, email, password) => {
//     try {
//       const response = await axios.post('http://localhost:5001/api/auth/signup', {
//         name,
//         email,
//         password,
//       });

//       set({ user: response.data.user, isAuthenticated: true });
//       console.log('Signup successful:', response.data.user);
//     } catch (error) {
//       console.error('Signup error:', error.response?.data?.message || error.message);
//       alert(error.response?.data?.message || 'Error creating user');
//     }
//   },
// }));

///////////
// import { create } from 'zustand';
// import axios from 'axios';

// export const useAuthStore = create((set) => ({
//   user: null,
//   isAuthenticated: false,

//   login: async (email, password) => {
//     try {
//       const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
//       set({ user: response.data.user, isAuthenticated: true });
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       alert(error.response?.data?.message || 'Error logging in');
//     }
//   },

//   signup: async (username, email, password) => {
//     try {
//       const response = await axios.post('http://localhost:5001/api/auth/register', { username, email, password });
//       set({ user: response.data.user, isAuthenticated: true });
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       alert(error.response?.data?.message || 'Error signing up');
//     }
//   },
// }));
//////////////
import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      set({ user: response.data.user, isAuthenticated: true });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      alert(error.response?.data?.message || 'Error logging in');
    }
  },

  signup: async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', { username, email, password });
      set({ user: response.data.user, isAuthenticated: true });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      alert(error.response?.data?.message || 'Error signing up');
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('token'); // Clear token from local storage
  },
}));

