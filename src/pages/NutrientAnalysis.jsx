// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Activity, Heart, Brain, Bone, Camera, Loader, AlertTriangle } from 'lucide-react';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import BackButton from '../components/ui/back-button';

// const NutrientAnalysis = () => {
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [nutrients, setNutrients] = useState(null);
//   const [error, setError] = useState(null);

//   const analyzeNutrients = async (imageData) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
//       const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//       const fileData = await fetch(imageData).then(r => r.blob());
//       const imageParts = [
//         {
//           inlineData: {
//             data: await blobToBase64(fileData),
//             mimeType: "image/jpeg"
//           }
//         }
//       ];

//       const prompt = `Analyze this food image and provide a detailed nutritional breakdown including:
//         1. Macronutrients (proteins, carbs, fats)
//         2. Vitamins (A, B, C, D, E, K)
//         3. Minerals (iron, calcium, zinc, etc.)
//         4. Estimated calories
//         5. Other important nutrients
//         Format as JSON with numerical values where possible.`;

//       const result = await model.generateContent([prompt, ...imageParts]);
//       const response = await result.response;
      
//       try {
//         const parsedNutrients = JSON.parse(response.text());
//         setNutrients(parsedNutrients);
//       } catch {
//         setNutrients({ error: "Could not parse nutrition data" });
//       }
//     } catch (err) {
//       setError("Failed to analyze nutrients. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const blobToBase64 = (blob) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result.split(',')[1]);
//       reader.readAsDataURL(blob);
//     });
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//         analyzeNutrients(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-screen pt-24 px-4 relative"
//     >
//       <BackButton />
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <h1 className="text-4xl font-bold text-white mb-6">AI Nutrient Analysis</h1>
//           <p className="text-lg text-white/70 mb-8">
//             Upload a photo of your food to get a detailed nutritional breakdown powered by AI.
//           </p>
//         </motion.div>

//         <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 mb-8">
//           <label
//             htmlFor="nutrient-photo-upload"
//             className="block w-full aspect-video rounded-lg border-2 border-dashed border-white/20 hover:border-blue-400 transition-colors cursor-pointer"
//           >
//             <div className="h-full flex flex-col items-center justify-center">
//               {image ? (
//                 <img
//                   src={image}
//                   alt="Food for analysis"
//                   className="h-full w-full object-cover rounded-lg"
//                 />
//               ) : (
//                 <>
//                   <Camera className="w-12 h-12 text-white/50 mb-4" />
//                   <p className="text-white/70">Upload a food photo for analysis</p>
//                 </>
//               )}
//             </div>
//             <input
//               type="file"
//               id="nutrient-photo-upload"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageUpload}
//             />
//           </label>
//         </div>

//         {error && (
//           <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
//             <AlertTriangle className="w-5 h-5" />
//             {error}
//           </div>
//         )}

//         {loading ? (
//           <div className="flex items-center justify-center p-8">
//             <Loader className="w-8 h-8 animate-spin text-blue-400" />
//             <span className="ml-3 text-white/70">Analyzing nutrients...</span>
//           </div>
//         ) : nutrients ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
//               <div className="flex items-center gap-4 mb-4">
//                 <Activity className="w-8 h-8 text-blue-400" />
//                 <h2 className="text-2xl font-semibold text-white">Macronutrients</h2>
//               </div>
//               <div className="space-y-4">
//                 {nutrients.macronutrients && Object.entries(nutrients.macronutrients).map(([key, value]) => (
//                   <div key={key}>
//                     <div className="flex justify-between text-white/70 mb-1">
//                       <span>{key}</span>
//                       <span>{value}</span>
//                     </div>
//                     <div className="h-2 bg-white/10 rounded-full overflow-hidden">
//                       <div className="h-full bg-blue-400 rounded-full" style={{ width: '60%' }}></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
//               <div className="flex items-center gap-4 mb-4">
//                 <Heart className="w-8 h-8 text-red-400" />
//                 <h2 className="text-2xl font-semibold text-white">Vitamins</h2>
//               </div>
//               <div className="space-y-4">
//                 {nutrients.vitamins && Object.entries(nutrients.vitamins).map(([key, value]) => (
//                   <div key={key}>
//                     <div className="flex justify-between text-white/70 mb-1">
//                       <span>Vitamin {key}</span>
//                       <span>{value}</span>
//                     </div>
//                     <div className="h-2 bg-white/10 rounded-full overflow-hidden">
//                       <div className="h-full bg-red-400 rounded-full" style={{ width: '70%' }}></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
//               <div className="flex items-center gap-4 mb-4">
//                 <Brain className="w-8 h-8 text-purple-400" />
//                 <h2 className="text-2xl font-semibold text-white">Minerals</h2>
//               </div>
//               <div className="space-y-4">
//                 {nutrients.minerals && Object.entries(nutrients.minerals).map(([key, value]) => (
//                   <div key={key}>
//                     <div className="flex justify-between text-white/70 mb-1">
//                       <span>{key}</span>
//                       <span>{value}</span>
//                     </div>
//                     <div className="h-2 bg-white/10 rounded-full overflow-hidden">
//                       <div className="h-full bg-purple-400 rounded-full" style={{ width: '65%' }}></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
//               <div className="flex items-center gap-4 mb-4">
//                 <Bone className="w-8 h-8 text-green-400" />
//                 <h2 className="text-2xl font-semibold text-white">Additional Info</h2>
//               </div>
//               <div className="space-y-4">
//                 {nutrients.additional && Object.entries(nutrients.additional).map(([key, value]) => (
//                   <div key={key}>
//                     <div className="flex justify-between text-white/70 mb-1">
//                       <span>{key}</span>
//                       <span>{value}</span>
//                     </div>
//                     <div className="h-2 bg-white/10 rounded-full overflow-hidden">
//                       <div className="h-full bg-green-400 rounded-full" style={{ width: '75%' }}></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : null}
//       </div>
//     </motion.div>
//   );
// };

// export default NutrientAnalysis;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Brain, Bone, Camera, Loader, AlertTriangle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import BackButton from '../components/ui/back-button';

const NutrientAnalysis = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nutrients, setNutrients] = useState(null);
  const [error, setError] = useState(null);

  const analyzeNutrients = async (imageData) => {
    try {
      setLoading(true);
      setError(null);

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const fileData = await fetch(imageData).then(r => r.blob());
      const imageParts = [
        {
          inlineData: {
            data: await blobToBase64(fileData),
            mimeType: "image/jpeg"
          }
        }
      ];

      const prompt = `Analyze this food image and provide the nutritional information in the following JSON format:
        {
          "calories": {
            "total": "number",
            "fromFat": "number",
            "fromCarbs": "number",
            "fromProtein": "number"
          },
          "macronutrients": {
            "protein": "amount in grams",
            "carbohydrates": "amount in grams",
            "fat": "amount in grams",
            "fiber": "amount in grams"
          },
          "vitamins": {
            "A": "amount with unit",
            "C": "amount with unit",
            "D": "amount with unit",
            "E": "amount with unit",
            "K": "amount with unit",
            "B12": "amount with unit"
          },
          "minerals": {
            "calcium": "amount with unit",
            "iron": "amount with unit",
            "potassium": "amount with unit",
            "magnesium": "amount with unit",
            "zinc": "amount with unit"
          },
          "additional": {
            "servingSize": "amount",
            "cholesterol": "amount with unit",
            "sodium": "amount with unit",
            "sugars": "amount in grams"
          }
        }`;

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      
      try {
        const jsonStr = response.text().substring(
          response.text().indexOf('{'), 
          response.text().lastIndexOf('}') + 1
        );
        setNutrients(JSON.parse(jsonStr));
      } catch (err) {
        console.error('Failed to parse response:', err);
        setError("Failed to parse nutrition data. Please try again.");
      }
    } catch (err) {
      setError("Failed to analyze nutrients. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(blob);
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        analyzeNutrients(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderNutrientBar = (value, max, color) => {
    const percentage = Math.min((parseFloat(value) / max) * 100, 100);
    return (
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-500`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 px-4 relative"
    >
      <BackButton />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-white mb-6">AI Nutrient Analysis</h1>
          <p className="text-lg text-white/70 mb-8">
            Upload a photo of your food to get a detailed nutritional breakdown powered by AI.
          </p>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 mb-8">
          <label
            htmlFor="nutrient-photo-upload"
            className="block w-full aspect-video rounded-lg border-2 border-dashed border-white/20 hover:border-blue-400 transition-colors cursor-pointer"
          >
            <div className="h-full flex flex-col items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt="Food for analysis"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <Camera className="w-12 h-12 text-white/50 mb-4" />
                  <p className="text-white/70">Upload a food photo for analysis</p>
                </>
              )}
            </div>
            <input
              type="file"
              id="nutrient-photo-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader className="w-8 h-8 animate-spin text-blue-400" />
            <span className="ml-3 text-white/70">Analyzing nutrients...</span>
          </div>
        ) : nutrients ? (
          <div className="space-y-6">
            {/* Calories Overview */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-4 mb-6">
                <Activity className="w-8 h-8 text-blue-400" />
                <div>
                  <h2 className="text-2xl font-semibold text-white">Calories</h2>
                  <p className="text-white/70">Total: {nutrients.calories?.total || '0'} kcal</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between text-white/70 mb-2">
                    <span>From Fat</span>
                    <span>{nutrients.calories?.fromFat || '0'} kcal</span>
                  </div>
                  {renderNutrientBar(
                    nutrients.calories?.fromFat || 0,
                    nutrients.calories?.total || 100,
                    'bg-yellow-400'
                  )}
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between text-white/70 mb-2">
                    <span>From Carbs</span>
                    <span>{nutrients.calories?.fromCarbs || '0'} kcal</span>
                  </div>
                  {renderNutrientBar(
                    nutrients.calories?.fromCarbs || 0,
                    nutrients.calories?.total || 100,
                    'bg-green-400'
                  )}
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between text-white/70 mb-2">
                    <span>From Protein</span>
                    <span>{nutrients.calories?.fromProtein || '0'} kcal</span>
                  </div>
                  {renderNutrientBar(
                    nutrients.calories?.fromProtein || 0,
                    nutrients.calories?.total || 100,
                    'bg-blue-400'
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Macronutrients */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Activity className="w-8 h-8 text-blue-400" />
                  <h2 className="text-2xl font-semibold text-white">Macronutrients</h2>
                </div>
                <div className="space-y-4">
                  {nutrients.macronutrients && Object.entries(nutrients.macronutrients).map(([key, value]) => (
                    <div key={key} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex justify-between text-white/70 mb-2">
                        <span className="capitalize">{key}</span>
                        <span>{value}</span>
                      </div>
                      {renderNutrientBar(
                        parseFloat(value),
                        100,
                        'bg-blue-400'
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Vitamins */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Heart className="w-8 h-8 text-red-400" />
                  <h2 className="text-2xl font-semibold text-white">Vitamins</h2>
                </div>
                <div className="space-y-4">
                  {nutrients.vitamins && Object.entries(nutrients.vitamins).map(([key, value]) => (
                    <div key={key} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex justify-between text-white/70 mb-2">
                        <span>Vitamin {key}</span>
                        <span>{value}</span>
                      </div>
                      {renderNutrientBar(
                        parseFloat(value),
                        100,
                        'bg-red-400'
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Minerals */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Brain className="w-8 h-8 text-purple-400" />
                  <h2 className="text-2xl font-semibold text-white">Minerals</h2>
                </div>
                <div className="space-y-4">
                  {nutrients.minerals && Object.entries(nutrients.minerals).map(([key, value]) => (
                    <div key={key} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex justify-between text-white/70 mb-2">
                        <span className="capitalize">{key}</span>
                        <span>{value}</span>
                      </div>
                      {renderNutrientBar(
                        parseFloat(value),
                        100,
                        'bg-purple-400'
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Bone className="w-8 h-8 text-green-400" />
                  <h2 className="text-2xl font-semibold text-white">Additional Info</h2>
                </div>
                <div className="space-y-4">
                  {nutrients.additional && Object.entries(nutrients.additional).map(([key, value]) => (
                    <div key={key} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex justify-between text-white/70 mb-2">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span>{value}</span>
                      </div>
                      {renderNutrientBar(
                        parseFloat(value),
                        100,
                        'bg-green-400'
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default NutrientAnalysis;