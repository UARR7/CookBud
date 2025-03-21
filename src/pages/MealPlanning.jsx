

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Calendar, Clock, ChefHat, Plus, X, Camera } from 'lucide-react';
// import BackButton from '../components/ui/back-button';

// const MealPlanning = () => {
//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//   const meals = ['Breakfast', 'Lunch', 'Dinner'];
//   const [selectedCell, setSelectedCell] = useState(null);
//   const [mealPlans, setMealPlans] = useState({});
//   const [newMealName, setNewMealName] = useState('');
//   const [image, setImage] = useState(null);

//   const handleImageUpload = (event, day, meal) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddMeal = (day, meal) => {
//     if (image && newMealName.trim()) {
//       setMealPlans(prev => ({
//         ...prev,
//         [`${day}-${meal}`]: {
//           image: image,
//           name: newMealName.trim(),
//           calories: '500 kcal',
//           time: '30 min'
//         }
//       }));
//       setSelectedCell(null);
//       setNewMealName('');
//       setImage(null);
//     }
//   };

//   const removeMeal = (day, meal) => {
//     const newMealPlans = { ...mealPlans };
//     delete newMealPlans[`${day}-${meal}`];
//     setMealPlans(newMealPlans);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-screen pt-24 px-4 relative"
//     >
//       <BackButton />
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <h1 className="text-4xl font-bold text-white mb-6">Meal Planning</h1>
//           <p className="text-lg text-white/70 mb-8">
//             Plan your meals for the week ahead with our smart meal planner.
//           </p>
//         </motion.div>

//         <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 overflow-x-auto">
//           <div className="min-w-[1000px]">
//             <div className="grid grid-cols-8 gap-4">
//               <div className="col-span-1"></div>
//               {days.map((day) => (
//                 <div
//                   key={day}
//                   className="col-span-1 text-center p-2 rounded-lg bg-white/5"
//                 >
//                   <h3 className="font-semibold text-white">{day}</h3>
//                 </div>
//               ))}

//               {meals.map((meal) => (
//                 <React.Fragment key={meal}>
//                   <div className="col-span-1 flex items-center">
//                     <span className="text-white/70">{meal}</span>
//                   </div>
//                   {days.map((day) => {
//                     const mealKey = `${day}-${meal}`;
//                     const mealData = mealPlans[mealKey];

//                     return (
//                       <div
//                         key={mealKey}
//                         className="col-span-1 aspect-square bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors relative group"
//                       >
//                         {mealData ? (
//                           <div className="h-full flex flex-col">
//                             <div className="relative h-2/3 mb-2">
//                               <img
//                                 src={mealData.image}
//                                 alt={mealData.name}
//                                 className="w-full h-full object-cover rounded-lg"
//                               />
//                               <button
//                                 onClick={() => removeMeal(day, meal)}
//                                 className="absolute top-1 right-1 p-1 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                               >
//                                 <X className="w-4 h-4 text-white" />
//                               </button>
//                             </div>
//                             <div className="text-xs text-white/70">
//                               <p className="font-medium text-white truncate">{mealData.name}</p>
//                               <p>{mealData.calories}</p>
//                               <p className="flex items-center">
//                                 <Clock className="w-3 h-3 mr-1" />
//                                 {mealData.time}
//                               </p>
//                             </div>
//                           </div>
//                         ) : (
//                           <button
//                             onClick={() => setSelectedCell(mealKey)}
//                             className="h-full w-full flex flex-col items-center justify-center text-center"
//                           >
//                             <Plus className="w-6 h-6 text-white/30 group-hover:text-blue-400 transition-colors" />
//                             <span className="text-xs text-white/50 mt-1">Add Meal</span>
//                           </button>
//                         )}

//                         {selectedCell === mealKey && (
//                           <div className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
//                             <div className="w-full p-4">
//                               <h3 className="text-white font-medium mb-4 text-center">Add New Meal</h3>
//                               <div className="space-y-4">
//                                 <div>
//                                   <input
//                                     type="text"
//                                     placeholder="Enter meal name"
//                                     value={newMealName}
//                                     onChange={(e) => setNewMealName(e.target.value)}
//                                     className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400"
//                                   />
//                                 </div>
//                                 <div className="flex flex-col items-center gap-2">
//                                   {image ? (
//                                     <div className="relative w-full aspect-square rounded-lg overflow-hidden">
//                                       <img
//                                         src={image}
//                                         alt="Meal preview"
//                                         className="w-full h-full object-cover"
//                                       />
//                                       <button
//                                         onClick={() => setImage(null)}
//                                         className="absolute top-1 right-1 p-1 bg-red-500/80 rounded-full"
//                                       >
//                                         <X className="w-4 h-4 text-white" />
//                                       </button>
//                                     </div>
//                                   ) : (
//                                     <label className="cursor-pointer w-full aspect-square rounded-lg border-2 border-dashed border-white/20 hover:border-blue-400 transition-colors flex flex-col items-center justify-center">
//                                       <Camera className="w-6 h-6 text-white/50 mb-2" />
//                                       <span className="text-xs text-white/50">Upload Photo</span>
//                                       <input
//                                         type="file"
//                                         accept="image/*"
//                                         className="hidden"
//                                         onChange={(e) => handleImageUpload(e, day, meal)}
//                                       />
//                                     </label>
//                                   )}
//                                 </div>
//                                 <div className="flex gap-2 justify-end">
//                                   <button
//                                     onClick={() => {
//                                       setSelectedCell(null);
//                                       setNewMealName('');
//                                       setImage(null);
//                                     }}
//                                     className="px-3 py-1.5 text-sm text-white/70 hover:text-white transition-colors"
//                                   >
//                                     Cancel
//                                   </button>
//                                   <button
//                                     onClick={() => handleAddMeal(day, meal)}
//                                     disabled={!image || !newMealName.trim()}
//                                     className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                   >
//                                     Add Meal
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//           <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
//             <div className="flex items-center gap-4 mb-4">
//               <Calendar className="w-6 h-6 text-blue-400" />
//               <h2 className="text-xl font-semibold text-white">Weekly Overview</h2>
//             </div>
//             <p className="text-white/70">
//               {Object.keys(mealPlans).length} meals planned this week
//             </p>
//           </div>

//           <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
//             <div className="flex items-center gap-4 mb-4">
//               <Clock className="w-6 h-6 text-green-400" />
//               <h2 className="text-xl font-semibold text-white">Prep Time</h2>
//             </div>
//             <p className="text-white/70">Average: 30 minutes per meal</p>
//           </div>

//           <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
//             <div className="flex items-center gap-4 mb-4">
//               <ChefHat className="w-6 h-6 text-purple-400" />
//               <h2 className="text-xl font-semibold text-white">Recipe Ideas</h2>
//             </div>
//             <p className="text-white/70">50+ recipes available</p>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default MealPlanning;
///////////////

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChefHat, Plus, X, Camera, Timer, Utensils, Loader } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import BackButton from '../components/ui/back-button';

const MealPlanning = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Lunch', 'Dinner'];
  const [selectedCell, setSelectedCell] = useState(null);
  const [mealPlans, setMealPlans] = useState({});
  const [newMealName, setNewMealName] = useState('');
  const [prepTime, setPrepTime] = useState('30');
  const [image, setImage] = useState(null);
  const [showRecipes, setShowRecipes] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiPrepTime, setAiPrepTime] = useState(null);

  // Sample recipe suggestions
  const recipeSuggestions = [
    {
      name: 'Quinoa Buddha Bowl',
      prepTime: '25 min',
      calories: '450 kcal',
      difficulty: 'Easy',
      type: 'Lunch',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80'
    },
    {
      name: 'Overnight Oats',
      prepTime: '10 min',
      calories: '320 kcal',
      difficulty: 'Easy',
      type: 'Breakfast',
      image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800&q=80'
    },
    {
      name: 'Grilled Salmon',
      prepTime: '35 min',
      calories: '580 kcal',
      difficulty: 'Medium',
      type: 'Dinner',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80'
    }
  ];

  const analyzePrepTime = async (imageData, mealName) => {
    try {
      setAnalyzing(true);
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const fileData = await fetch(imageData).then(r => r.blob());
      const imageParts = [
        {
          inlineData: {
            data: await blobToBase64(fileData),
            mimeType: "image/jpeg"
          }
        }
      ];

      const prompt = `Analyze this image of ${mealName} and estimate the preparation time in minutes. Consider:
        1. Complexity of the dish
        2. Number of ingredients
        3. Cooking methods required
        4. Any visible preparation steps
        Return ONLY a number representing the estimated preparation time in minutes.`;

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const estimatedTime = parseInt(response.text().trim());
      
      if (!isNaN(estimatedTime)) {
        setPrepTime(estimatedTime.toString());
        setAiPrepTime(estimatedTime);
      }
    } catch (err) {
      console.error('Failed to analyze prep time:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(blob);
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImage(reader.result);
        if (newMealName) {
          await analyzePrepTime(reader.result, newMealName);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMeal = (day, meal) => {
    if (image && newMealName.trim()) {
      setMealPlans(prev => ({
        ...prev,
        [`${day}-${meal}`]: {
          image: image,
          name: newMealName.trim(),
          calories: '500 kcal',
          time: `${prepTime} min`,
          aiAnalyzed: aiPrepTime !== null
        }
      }));
      setSelectedCell(null);
      setNewMealName('');
      setPrepTime('30');
      setImage(null);
      setAiPrepTime(null);
    }
  };

  const removeMeal = (day, meal) => {
    const newMealPlans = { ...mealPlans };
    delete newMealPlans[`${day}-${meal}`];
    setMealPlans(newMealPlans);
  };

  const calculateAveragePrepTime = () => {
    const times = Object.values(mealPlans).map(meal => parseInt(meal.time));
    if (times.length === 0) return 0;
    return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 px-4 relative"
    >
      <BackButton />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-white mb-6">Meal Planning</h1>
          <p className="text-lg text-white/70 mb-8">
            Plan your meals for the week ahead with our AI-powered meal planner.
          </p>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 overflow-x-auto">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-1"></div>
              {days.map((day) => (
                <div
                  key={day}
                  className="col-span-1 text-center p-2 rounded-lg bg-white/5"
                >
                  <h3 className="font-semibold text-white">{day}</h3>
                </div>
              ))}

              {meals.map((meal) => (
                <React.Fragment key={meal}>
                  <div className="col-span-1 flex items-center">
                    <span className="text-white/70">{meal}</span>
                  </div>
                  {days.map((day) => {
                    const mealKey = `${day}-${meal}`;
                    const mealData = mealPlans[mealKey];

                    return (
                      <div
                        key={mealKey}
                        className="col-span-1 aspect-square bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors relative group"
                      >
                        {mealData ? (
                          <div className="h-full flex flex-col">
                            <div className="relative h-2/3 mb-2">
                              <img
                                src={mealData.image}
                                alt={mealData.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <button
                                onClick={() => removeMeal(day, meal)}
                                className="absolute top-1 right-1 p-1 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4 text-white" />
                              </button>
                              {mealData.aiAnalyzed && (
                                <div className="absolute bottom-1 right-1 bg-blue-500/80 rounded-full p-1">
                                  <ChefHat className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-white/70">
                              <p className="font-medium text-white truncate">{mealData.name}</p>
                              <p>{mealData.calories}</p>
                              <p className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {mealData.time}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedCell(mealKey)}
                            className="h-full w-full flex flex-col items-center justify-center text-center"
                          >
                            <Plus className="w-6 h-6 text-white/30 group-hover:text-blue-400 transition-colors" />
                            <span className="text-xs text-white/50 mt-1">Add Meal</span>
                          </button>
                        )}

                        {selectedCell === mealKey && (
                          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                            <div className="w-full p-4">
                              <h3 className="text-white font-medium mb-4 text-center">Add New Meal</h3>
                              <div className="space-y-4">
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Enter meal name"
                                    value={newMealName}
                                    onChange={(e) => setNewMealName(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400"
                                  />
                                </div>
                                <div>
                                  <label className="block text-white/70 text-sm mb-2">
                                    Prep Time (minutes)
                                    {analyzing && (
                                      <span className="ml-2 inline-flex items-center text-blue-400">
                                        <Loader className="w-3 h-3 animate-spin mr-1" />
                                        Analyzing...
                                      </span>
                                    )}
                                  </label>
                                  <input
                                    type="number"
                                    value={prepTime}
                                    onChange={(e) => setPrepTime(e.target.value)}
                                    min="5"
                                    max="180"
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400"
                                  />
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  {image ? (
                                    <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                                      <img
                                        src={image}
                                        alt="Meal preview"
                                        className="w-full h-full object-cover"
                                      />
                                      <button
                                        onClick={() => setImage(null)}
                                        className="absolute top-1 right-1 p-1 bg-red-500/80 rounded-full"
                                      >
                                        <X className="w-4 h-4 text-white" />
                                      </button>
                                    </div>
                                  ) : (
                                    <label className="cursor-pointer w-full aspect-square rounded-lg border-2 border-dashed border-white/20 hover:border-blue-400 transition-colors flex flex-col items-center justify-center">
                                      <Camera className="w-6 h-6 text-white/50 mb-2" />
                                      <span className="text-xs text-white/50">Upload Photo</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                      />
                                    </label>
                                  )}
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <button
                                    onClick={() => {
                                      setSelectedCell(null);
                                      setNewMealName('');
                                      setPrepTime('30');
                                      setImage(null);
                                      setAiPrepTime(null);
                                    }}
                                    className="px-3 py-1.5 text-sm text-white/70 hover:text-white transition-colors"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleAddMeal(day, meal)}
                                    disabled={!image || !newMealName.trim() || analyzing}
                                    className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    Add Meal
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
            <div className="flex items-center gap-4 mb-4">
              <Calendar className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Weekly Overview</h2>
            </div>
            <p className="text-white/70">
              {Object.keys(mealPlans).length} meals planned this week
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
            <div className="flex items-center gap-4 mb-4">
              <Clock className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Prep Time</h2>
            </div>
            <p className="text-white/70">
              Average: {calculateAveragePrepTime()} minutes per meal
              <span className="block text-sm mt-1">
                AI-analyzed for optimal accuracy
              </span>
            </p>
          </div>

          <button
            onClick={() => setShowRecipes(true)}
            className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-colors text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <ChefHat className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Recipe Ideas</h2>
            </div>
            <p className="text-white/70">50+ recipes available</p>
          </button>
        </div>

        {/* Recipe Suggestions Modal */}
        {showRecipes && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900/90 rounded-xl border border-white/10 p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Recipe Suggestions</h2>
                <button
                  onClick={() => setShowRecipes(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white/70" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipeSuggestions.map((recipe, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">{recipe.name}</h3>
                      <div className="space-y-2 text-sm text-white/70">
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4" />
                          <span>{recipe.prepTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Utensils className="w-4 h-4" />
                          <span>{recipe.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ChefHat className="w-4 h-4" />
                          <span>{recipe.type}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setNewMealName(recipe.name);
                          setPrepTime(recipe.prepTime.split(' ')[0]);
                          setShowRecipes(false);
                        }}
                        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Use Recipe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MealPlanning;

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Calendar, Clock, ChefHat, Plus, X, Camera, Timer, Utensils, Loader, Edit } from "lucide-react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { useMealStore } from "../stores/mealStore";
// import BackButton from "../components/ui/back-button";

// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// const meals = ["Breakfast", "Lunch", "Dinner"];

// const MealPlanning = () => {
//   const { mealPlans, addMeal, removeMeal, editMeal } = useMealStore();
//   const [selectedCell, setSelectedCell] = useState(null);
//   const [mealName, setMealName] = useState("");
//   const [prepTime, setPrepTime] = useState("30");
//   const [image, setImage] = useState(null);
//   const [showRecipes, setShowRecipes] = useState(false);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [aiPrepTime, setAiPrepTime] = useState(null);
//   const [editingMeal, setEditingMeal] = useState(null);

//   useEffect(() => {
//     const today = new Date().getDay();
//     document.title = `Meal Planning - ${days[today]}`;
//   }, []);

//   const recipeSuggestions = [
//     { name: "Quinoa Buddha Bowl", prepTime: "25 min", calories: "450 kcal", type: "Lunch", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80" },
//     { name: "Overnight Oats", prepTime: "10 min", calories: "320 kcal", type: "Breakfast", image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800&q=80" },
//     { name: "Grilled Salmon", prepTime: "35 min", calories: "580 kcal", type: "Dinner", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80" }
//   ];

//   const analyzePrepTime = async (imageData, mealName) => {
//     try {
//       setAnalyzing(true);
//       const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
//       const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

//       const fileData = await fetch(imageData).then(r => r.blob());
//       const imageParts = [{ inlineData: { data: await blobToBase64(fileData), mimeType: "image/jpeg" } }];
      
//       const prompt = `Analyze this image of ${mealName} and estimate the preparation time in minutes. Return ONLY a number.`;
      
//       const result = await model.generateContent([prompt, ...imageParts]);
//       const response = await result.response;
//       const estimatedTime = parseInt(response.text().trim());

//       if (!isNaN(estimatedTime)) {
//         setPrepTime(estimatedTime.toString());
//         setAiPrepTime(estimatedTime);
//       }
//     } catch (err) {
//       console.error("AI Analysis Failed:", err);
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   const blobToBase64 = blob => new Promise(resolve => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result.split(",")[1]);
//     reader.readAsDataURL(blob);
//   });

//   const handleImageUpload = event => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         setImage(reader.result);
//         if (mealName) {
//           await analyzePrepTime(reader.result, mealName);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveMeal = (day, meal) => {
//     if (!image || !mealName.trim()) return;

//     if (editingMeal) {
//       editMeal(day, meal, { image, name: mealName.trim(), time: `${prepTime} min` });
//       setEditingMeal(null);
//     } else {
//       addMeal(day, meal, { image, name: mealName.trim(), time: `${prepTime} min` });
//     }

//     setSelectedCell(null);
//     setMealName("");
//     setPrepTime("30");
//     setImage(null);
//     setAiPrepTime(null);
//   };

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pt-24 px-4">
//       <BackButton />
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-white mb-6">Meal Planning</h1>

//         <div className="bg-white/5 p-6 rounded-xl border border-white/10">
//           <div className="grid grid-cols-8 gap-4">
//             <div className="col-span-1"></div>
//             {days.map(day => <div key={day} className="col-span-1 text-center p-2">{day}</div>)}

//             {meals.map(meal => (
//               <React.Fragment key={meal}>
//                 <div className="col-span-1">{meal}</div>
//                 {days.map(day => {
//                   const mealKey = `${day}-${meal}`;
//                   const mealData = mealPlans[mealKey];

//                   return (
//                     <div key={mealKey} className="col-span-1 p-2 relative group">
//                       {mealData ? (
//                         <div className="relative">
//                           <img src={mealData.image} alt={mealData.name} className="w-full h-full rounded-lg" />
//                           <button onClick={() => removeMeal(day, meal)} className="absolute top-1 right-1 bg-red-500 p-1 rounded-full">
//                             <X className="w-4 h-4 text-white" />
//                           </button>
//                           <button onClick={() => { setEditingMeal(mealData); setMealName(mealData.name); setPrepTime(mealData.time.split(' ')[0]); setImage(mealData.image); setSelectedCell(mealKey); }} className="absolute top-1 left-1 bg-yellow-500 p-1 rounded-full">
//                             <Edit className="w-4 h-4 text-white" />
//                           </button>
//                         </div>
//                       ) : (
//                         <button onClick={() => setSelectedCell(mealKey)} className="w-full h-full flex items-center justify-center">
//                           <Plus className="w-6 h-6 text-white/30" />
//                         </button>
//                       )}
//                     </div>
//                   );
//                 })}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default MealPlanning;

