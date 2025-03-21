import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChefHat, ShoppingCart, Calendar, Activity, AlertTriangle, MessageSquare} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const Dashboard = () => {
  const user = useAuthStore(state => state.user);

  const features = [
    {
      icon: ChefHat,
      title: 'Generate Recipe',
      description: 'Get AI-powered recipe suggestions from food photos',
      path: '/generate-recipe',
      color: 'blue'
    },
    {
      icon: ShoppingCart,
      title: 'Grocery List',
      description: 'Create and manage your shopping lists',
      path: '/grocery-list',
      color: 'green'
    },
    {
      icon: Calendar,
      title: 'Meal Planning',
      description: 'Plan your meals for the week ahead',
      path: '/meal-planning',
      color: 'purple'
    },
    {
      icon: Activity,
      title: 'Nutrient Analysis',
      description: 'Get detailed nutritional information from food photos',
      path: '/nutrient-analysis',
      color: 'orange'
    },
    {
      icon: AlertTriangle,
      title: 'Age Restrictions',
      description: 'Check age-appropriate dish advisories',
      path: '/age-restrictions',
      color: 'red'
    },
    {
      icon: MessageSquare,
      title: 'Forum',
      description: 'Join discussions and share recipes with the community',
      path: '/forum',
      color: 'indigo'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Welcome to CookBud</h1>
          <p className="text-lg text-white/70 mb-12">
            Choose a feature to get started with your culinary journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.path}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link
                to={feature.path}
                className="block h-full"
              >
                <div className={`h-full bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-colors group`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-${feature.color}-500/10`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;


// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { ChefHat, ShoppingCart, Calendar, Activity, AlertTriangle, MessageSquare } from 'lucide-react';
// import { useAuthStore } from '../stores/authStore';

// const Dashboard = () => {
//   const user = useAuthStore(state => state.user);

//   const features = [
//     {
//       icon: ChefHat,
//       title: 'Generate Recipe',
//       description: 'Get AI-powered recipe suggestions from food photos',
//       path: '/generate-recipe',
//       color: 'blue'
//     },
//     {
//       icon: ShoppingCart,
//       title: 'Grocery List',
//       description: 'Create and manage your shopping lists',
//       path: '/grocery-list',
//       color: 'green'
//     },
//     {
//       icon: Calendar,
//       title: 'Meal Planning',
//       description: 'Plan your meals for the week ahead',
//       path: '/meal-planning',
//       color: 'purple'
//     },
//     {
//       icon: Activity,
//       title: 'Nutrient Analysis',
//       description: 'Get detailed nutritional information from food photos',
//       path: '/nutrient-analysis',
//       color: 'orange'
//     },
//     {
//       icon: AlertTriangle,
//       title: 'Age Restrictions',
//       description: 'Check age-appropriate dish advisories',
//       path: '/age-restrictions',
//       color: 'red'
//     },
//     {
//       icon: MessageSquare,
//       title: 'Forum',
//       description: 'Join discussions and share recipes with the community',
//       path: '/forum',
//       color: 'indigo'
//     }
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-screen pt-24 px-4"
//     >
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <h1 className="text-4xl font-bold text-white mb-2">Welcome to CookBud</h1>
//           <p className="text-lg text-white/70 mb-12">
//             Choose a feature to get started with your culinary journey
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.path}
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2 + index * 0.1 }}
//             >
//               <Link
//                 to={feature.path}
//                 className="block h-full"
//               >
//                 <div className={`h-full bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-colors group`}>
//                   <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-${feature.color}-500/10`}>
//                     <feature.icon className={`h-6 w-6 text-${feature.color}-400`} />
//                   </div>
//                   <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
//                     {feature.title}
//                   </h3>
//                   <p className="text-white/70">
//                     {feature.description}
//                   </p>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Dashboard;