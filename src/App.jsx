import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AuroraBackground from './components/ui/aurora-background';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import RecipeGeneration from './pages/RecipeGeneration';
import GroceryList from './pages/GroceryList';
import AgeRestrictions from './pages/AgeRestrictions';
import NutrientAnalysis from './pages/NutrientAnalysis';
import MealPlanning from './pages/MealPlanning';
import { useAuthStore } from './stores/authStore';
import Forum from './pages/Forum';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Router>
      <AuroraBackground>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/generate-recipe" element={
              <ProtectedRoute>
                <RecipeGeneration />
              </ProtectedRoute>
            } />
            <Route path="/grocery-list" element={
              <ProtectedRoute>
                <GroceryList />
              </ProtectedRoute>
            } />
            <Route path="/age-restrictions" element={
              <ProtectedRoute>
                <AgeRestrictions />
              </ProtectedRoute>
            } />
            <Route path="/nutrient-analysis" element={
              <ProtectedRoute>
                <NutrientAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/meal-planning" element={
              <ProtectedRoute>
                <MealPlanning />
              </ProtectedRoute>
            } />
            <Route path="/forum" element={
              <ProtectedRoute>
                <Forum />
              </ProtectedRoute>
            } />
          </Routes>
        </AnimatePresence>
      </AuroraBackground>
    </Router>
  );
}

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AnimatePresence } from 'framer-motion';
// import AuroraBackground from './components/ui/aurora-background';
// import Navbar from './components/Navbar';
// import LandingPage from './pages/LandingPage';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import RecipeGeneration from './pages/RecipeGeneration';
// import GroceryList from './pages/GroceryList';
// import AgeRestrictions from './pages/AgeRestrictions';
// import NutrientAnalysis from './pages/NutrientAnalysis';
// import MealPlanning from './pages/MealPlanning';
// import Forum from './pages/Forum';
// import { useAuthStore } from './stores/authStore';

// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// function App() {
//   const isAuthenticated = useAuthStore(state => state.isAuthenticated);

//   return (
//     <Router>
//       <AuroraBackground>
//         <Navbar />
//         <AnimatePresence mode="wait">
//           <Routes>
//             <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
//             <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
//             <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />} />
            
//             {/* Protected Routes */}
//             <Route path="/dashboard" element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             } />
//             <Route path="/generate-recipe" element={
//               <ProtectedRoute>
//                 <RecipeGeneration />
//               </ProtectedRoute>
//             } />
//             <Route path="/grocery-list" element={
//               <ProtectedRoute>
//                 <GroceryList />
//               </ProtectedRoute>
//             } />
//             <Route path="/age-restrictions" element={
//               <ProtectedRoute>
//                 <AgeRestrictions />
//               </ProtectedRoute>
//             } />
//             <Route path="/nutrient-analysis" element={
//               <ProtectedRoute>
//                 <NutrientAnalysis />
//               </ProtectedRoute>
//             } />
//             <Route path="/meal-planning" element={
//               <ProtectedRoute>
//                 <MealPlanning />
//               </ProtectedRoute>
//             } />
//             <Route path="/forum" element={
//               <ProtectedRoute>
//                 <Forum />
//               </ProtectedRoute>
//             } />
//           </Routes>
//         </AnimatePresence>
//       </AuroraBackground>
//     </Router>
//   );
// }

// export default App;