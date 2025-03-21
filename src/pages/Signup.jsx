// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../stores/authStore';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const login = useAuthStore(state => state.login);

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   // In a real app, you would create the account in your backend
//   //   login({ email, name });
//   //   navigate('/dashboard');
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await signup(name, email, password); // ✅ Use async function from Zustand store
//     navigate('/dashboard');
//   };
  

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-screen pt-16 flex items-center justify-center"
//     >
//       <div className="w-full max-w-md">
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10"
//         >
//           <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your full name"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Create a password"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
//             >
//               Sign Up
//             </button>
//           </form>
//           <p className="mt-4 text-center text-white/70">
//             Already have an account?{' '}
//             <Link to="/login" className="text-blue-400 hover:text-blue-300">
//               Sign in
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore'; // ✅ Import the store

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const signup = useAuthStore(state => state.signup); // ✅ Get `signup` function from Zustand store

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password); // ✅ Call the `signup` function
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 flex items-center justify-center"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-white/70">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Signup;
