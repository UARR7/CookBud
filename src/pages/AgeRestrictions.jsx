// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { AlertTriangle, ChefHat, Loader, Utensils, AlertCircle } from 'lucide-react';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import BackButton from '../components/ui/back-button';

// const AgeRestrictions = () => {
//   const [age, setAge] = useState('');
//   const [ingredients, setIngredients] = useState('');
//   const [allergies, setAllergies] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [recipe, setRecipe] = useState(null);
//   const [error, setError] = useState(null);

//   const getAgeGroup = (age) => {
//     const ageNum = parseInt(age);
//     if (ageNum <= 1) return 'infant';
//     if (ageNum <= 3) return 'toddler';
//     if (ageNum <= 12) return 'child';
//     return 'adult';
//   };

//   const generateRecipe = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
//       const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//       const ageGroup = getAgeGroup(age);
//       const prompt = `Generate a safe and age-appropriate recipe for a ${ageGroup} who is ${age} years old.
//         Available ingredients: ${ingredients}
//         Allergies/Restrictions: ${allergies || 'None'}
        
//         Please provide:
//         1. Recipe name
//         2. Age-specific safety notes and precautions
//         3. Ingredients with measurements
//         4. Step-by-step instructions
//         5. Nutritional benefits for the age group
//         6. Any choking hazards or special preparation requirements
        
//         Format the response in clear sections.`;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       setRecipe(response.text());
//     } catch (err) {
//       setError("Failed to generate recipe. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
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
//           <h1 className="text-4xl font-bold text-white mb-6">Age-Appropriate Recipe Generator</h1>
//           <p className="text-lg text-white/70 mb-8">
//             Get personalized recipe suggestions based on age, available ingredients, and dietary restrictions.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
//             <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
//               <AlertTriangle className="w-5 h-5 text-yellow-400" />
//               Input Information
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-white/70 mb-1">
//                   Age (in years)
//                 </label>
//                 <input
//                   type="number"
//                   value={age}
//                   onChange={(e) => setAge(e.target.value)}
//                   min="0"
//                   max="100"
//                   className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter age"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-white/70 mb-1">
//                   Available Ingredients
//                 </label>
//                 <textarea
//                   value={ingredients}
//                   onChange={(e) => setIngredients(e.target.value)}
//                   className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
//                   placeholder="List your available ingredients, separated by commas"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-white/70 mb-1">
//                   Allergies & Restrictions
//                 </label>
//                 <textarea
//                   value={allergies}
//                   onChange={(e) => setAllergies(e.target.value)}
//                   className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
//                   placeholder="List any allergies or dietary restrictions"
//                 />
//               </div>
//               <button
//                 onClick={generateRecipe}
//                 disabled={!age || !ingredients || loading}
//                 className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <Loader className="w-5 h-5 animate-spin" />
//                     Generating Recipe...
//                   </>
//                 ) : (
//                   <>
//                     <ChefHat className="w-5 h-5" />
//                     Generate Recipe
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
//             <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
//               <AlertCircle className="w-5 h-5 text-blue-400" />
//               Age-Specific Guidelines
//             </h2>
//             <div className="space-y-4">
//               <div className="p-4 bg-white/5 rounded-lg">
//                 <h3 className="text-lg font-medium text-white mb-2">Infants (0-12 months)</h3>
//                 <ul className="space-y-1 text-white/70 text-sm">
//                   <li>• No honey - risk of infant botulism</li>
//                   <li>• No cow's milk before 12 months</li>
//                   <li>• Avoid whole nuts and seeds</li>
//                   <li>• No added salt or sugar</li>
//                 </ul>
//               </div>
//               <div className="p-4 bg-white/5 rounded-lg">
//                 <h3 className="text-lg font-medium text-white mb-2">Toddlers (1-3 years)</h3>
//                 <ul className="space-y-1 text-white/70 text-sm">
//                   <li>• Cut foods into small pieces</li>
//                   <li>• Avoid whole grapes and cherry tomatoes</li>
//                   <li>• No hard candies or popcorn</li>
//                   <li>• Limited added sugars</li>
//                 </ul>
//               </div>
//               <div className="p-4 bg-white/5 rounded-lg">
//                 <h3 className="text-lg font-medium text-white mb-2">Children (4-12 years)</h3>
//                 <ul className="space-y-1 text-white/70 text-sm">
//                   <li>• Moderate caffeine content</li>
//                   <li>• Avoid very spicy foods</li>
//                   <li>• Be cautious with raw foods</li>
//                   <li>• Monitor sugar intake</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         {error && (
//           <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
//             <AlertTriangle className="w-5 h-5" />
//             {error}
//           </div>
//         )}

//         {recipe && !loading && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6"
//           >
//             <div className="flex items-center gap-4 mb-6">
//               <Utensils className="w-6 h-6 text-green-400" />
//               <h2 className="text-2xl font-semibold text-white">Generated Recipe</h2>
//             </div>
//             <div className="prose prose-invert max-w-none">
//               <pre className="whitespace-pre-wrap text-white/90 font-sans">
//                 {recipe}
//               </pre>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default AgeRestrictions;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ChefHat, Loader, Utensils, AlertCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import BackButton from '../components/ui/back-button';

const AgeRestrictions = () => {
  const [age, setAge] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [allergies, setAllergies] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  const getAgeGroup = (age) => {
    const ageNum = parseInt(age);
    if (ageNum <= 1) return 'infant';
    if (ageNum <= 3) return 'toddler';
    if (ageNum <= 12) return 'child';
    return 'adult';
  };

  const generateRecipe = async () => {
    try {
      setLoading(true);
      setError(null);

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const ageGroup = getAgeGroup(age);
      const prompt = `Generate a safe and age-appropriate recipe for a ${ageGroup} who is ${age} years old.
        Available ingredients: ${ingredients}
        Allergies/Restrictions: ${allergies || 'None'}
        
        Provide the response in the following JSON format:
        {
          "recipeName": "Name of the recipe",
          "safetyNotes": ["List of age-specific safety notes and precautions"],
          "ingredients": ["List of ingredients with measurements"],
          "instructions": ["Step-by-step instructions"],
          "nutritionalBenefits": ["List of nutritional benefits for the age group"],
          "hazards": ["List of choking hazards or special preparation requirements"]
        }`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      try {
        const jsonStr = response.text().substring(
          response.text().indexOf('{'), 
          response.text().lastIndexOf('}') + 1
        );
        setRecipe(JSON.parse(jsonStr));
      } catch (err) {
        console.error('Failed to parse response:', err);
        setError("Failed to parse recipe format. Please try again.");
      }
    } catch (err) {
      setError("Failed to generate recipe. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderRecipe = (data) => {
    if (!data) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 bg-white/10 rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-white mb-2">{data.recipeName}</h3>
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h4 className="text-lg font-medium text-yellow-400 mb-2">Safety Notes</h4>
            <ul className="space-y-2">
              {data.safetyNotes.map((note, i) => (
                <li key={i} className="text-white/80 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Ingredients</h4>
          <ul className="space-y-2">
            {data.ingredients.map((ingredient, i) => (
              <li key={i} className="text-white/80">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white/10 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Nutritional Benefits</h4>
          <ul className="space-y-2">
            {data.nutritionalBenefits.map((benefit, i) => (
              <li key={i} className="text-white/80">{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 bg-white/10 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Instructions</h4>
          <ol className="space-y-3">
            {data.instructions.map((step, i) => (
              <li key={i} className="text-white/80 flex items-start gap-3">
                <span className="bg-white/10 rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {data.hazards && data.hazards.length > 0 && (
          <div className="md:col-span-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <h4 className="text-lg font-medium text-red-400 mb-2">Special Considerations & Hazards</h4>
            <ul className="space-y-2">
              {data.hazards.map((hazard, i) => (
                <li key={i} className="text-white/80 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{hazard}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
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
          <h1 className="text-4xl font-bold text-white mb-6">Age-Appropriate Recipe Generator</h1>
          <p className="text-lg text-white/70 mb-8">
            Get personalized recipe suggestions based on age, available ingredients, and dietary restrictions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Input Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Age (in years)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Available Ingredients
                </label>
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder="List your available ingredients, separated by commas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Allergies & Restrictions
                </label>
                <textarea
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder="List any allergies or dietary restrictions"
                />
              </div>
              <button
                onClick={generateRecipe}
                disabled={!age || !ingredients || loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Generating Recipe...
                  </>
                ) : (
                  <>
                    <ChefHat className="w-5 h-5" />
                    Generate Recipe
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-400" />
              Age-Specific Guidelines
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-2">Infants (0-12 months)</h3>
                <ul className="space-y-1 text-white/70 text-sm">
                  <li>• No honey - risk of infant botulism</li>
                  <li>• No cow's milk before 12 months</li>
                  <li>• Avoid whole nuts and seeds</li>
                  <li>• No added salt or sugar</li>
                </ul>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-2">Toddlers (1-3 years)</h3>
                <ul className="space-y-1 text-white/70 text-sm">
                  <li>• Cut foods into small pieces</li>
                  <li>• Avoid whole grapes and cherry tomatoes</li>
                  <li>• No hard candies or popcorn</li>
                  <li>• Limited added sugars</li>
                </ul>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-2">Children (4-12 years)</h3>
                <ul className="space-y-1 text-white/70 text-sm">
                  <li>• Moderate caffeine content</li>
                  <li>• Avoid very spicy foods</li>
                  <li>• Be cautious with raw foods</li>
                  <li>• Monitor sugar intake</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </div>
        )}

        {recipe && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <Utensils className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-semibold text-white">Generated Recipe</h2>
            </div>
            {renderRecipe(recipe)}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AgeRestrictions;