

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Loader, AlertTriangle, Utensils, ShoppingCart, Activity } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import BackButton from '../components/ui/back-button';

const RecipeGeneration = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [analysisType, setAnalysisType] = useState(null);

  const generatePrompt = (type) => {
    switch (type) {
      case 'recipe':
        return `Analyze this food image and provide in JSON format:
          {
            "ingredients": ["list of ingredients visible"],
            "instructions": ["detailed step-by-step instructions"],
            "cookingTime": "estimated time",
            "difficulty": "level",
            "servings": "number"
          }`;
      case 'groceries':
        return `Analyze this food image and provide in JSON format:
          {
            "mainIngredients": ["list with quantities for 4 servings"],
            "substitutes": ["common substitutes"],
            "pantryStaples": ["additional items needed"]
          }`;
      case 'nutrients':
        return `Analyze this food image and provide in JSON format:
          {
            "calories": "per serving",
            "macros": {
              "protein": "amount",
              "carbs": "amount",
              "fats": "amount"
            },
            "vitamins": ["list of vitamins with amounts"],
            "minerals": ["list of minerals with amounts"]
          }`;
      default:
        return '';
    }
  };

  const parseResponse = (text, type) => {
    try {
      const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
      return JSON.parse(jsonStr);
    } catch (err) {
      console.error('Failed to parse response:', err);
      return null;
    }
  };

  const analyzeImage = async (imageData, type) => {
    try {
      setLoading(true);
      setError(null);
      setAnalysisType(type);

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

      const prompt = generatePrompt(type);
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const parsedResponse = parseResponse(response.text(), type);
      setResult(parsedResponse);
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
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
        setResult(null);
        setAnalysisType(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderRecipeResult = (data) => {
    if (!data) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Ingredients</h3>
          <ul className="space-y-2">
            {data.ingredients.map((ingredient, i) => (
              <li key={i} className="text-white/80">{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Details</h3>
          <div className="space-y-2 text-white/80">
            <p>Cooking Time: {data.cookingTime}</p>
            <p>Difficulty: {data.difficulty}</p>
            <p>Servings: {data.servings}</p>
          </div>
        </div>
        <div className="md:col-span-2 bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Instructions</h3>
          <ol className="space-y-2">
            {data.instructions.map((step, i) => (
              <li key={i} className="text-white/80">{i + 1}. {step}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  };

  const renderGroceryResult = (data) => {
    if (!data) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Main Ingredients</h3>
          <ul className="space-y-2">
            {data.mainIngredients.map((item, i) => (
              <li key={i} className="text-white/80">{item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Possible Substitutes</h3>
          <ul className="space-y-2">
            {data.substitutes.map((item, i) => (
              <li key={i} className="text-white/80">{item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Pantry Staples</h3>
          <ul className="space-y-2">
            {data.pantryStaples.map((item, i) => (
              <li key={i} className="text-white/80">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderNutrientResult = (data) => {
    if (!data) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Macronutrients</h3>
          <div className="space-y-2 text-white/80">
            <p>Calories: {data.calories}</p>
            <p>Protein: {data.macros.protein}</p>
            <p>Carbs: {data.macros.carbs}</p>
            <p>Fats: {data.macros.fats}</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Vitamins</h3>
          <ul className="space-y-2">
            {data.vitamins.map((vitamin, i) => (
              <li key={i} className="text-white/80">{vitamin}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Minerals</h3>
          <ul className="space-y-2">
            {data.minerals.map((mineral, i) => (
              <li key={i} className="text-white/80">{mineral}</li>
            ))}
          </ul>
        </div>
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
          <h1 className="text-4xl font-bold text-white mb-6">AI Kitchen Assistant</h1>
          <p className="text-lg text-white/70 mb-8">
            Upload a photo once and get recipe suggestions, create grocery lists, or analyze nutrients.
          </p>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8">
          <div className="mb-8">
            <label
              htmlFor="photo-upload"
              className="block w-full aspect-video rounded-lg border-2 border-dashed border-white/20 hover:border-blue-400 transition-colors cursor-pointer"
            >
              <div className="h-full flex flex-col items-center justify-center">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded food"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <Camera className="w-12 h-12 text-white/50 mb-4" />
                    <p className="text-white/70">Click to upload a food photo</p>
                  </>
                )}
              </div>
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {image && !loading && !result && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => analyzeImage(image, 'recipe')}
                className="flex items-center justify-center gap-2 p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 transition-colors"
              >
                <Utensils className="w-5 h-5" />
                Generate Recipe
              </button>
              <button
                onClick={() => analyzeImage(image, 'groceries')}
                className="flex items-center justify-center gap-2 p-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg text-green-400 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Create Grocery List
              </button>
              <button
                onClick={() => analyzeImage(image, 'nutrients')}
                className="flex items-center justify-center gap-2 p-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg text-purple-400 transition-colors"
              >
                <Activity className="w-5 h-5" />
                Analyze Nutrients
              </button>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              {error}
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center p-8">
              <Loader className="w-8 h-8 animate-spin text-blue-400" />
              <span className="ml-3 text-white/70">
                {analysisType === 'recipe' && 'Generating recipe...'}
                {analysisType === 'groceries' && 'Creating grocery list...'}
                {analysisType === 'nutrients' && 'Analyzing nutrients...'}
              </span>
            </div>
          )}

          {result && !loading && (
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-6">
                {analysisType === 'recipe' && <Utensils className="w-6 h-6 text-blue-400" />}
                {analysisType === 'groceries' && <ShoppingCart className="w-6 h-6 text-green-400" />}
                {analysisType === 'nutrients' && <Activity className="w-6 h-6 text-purple-400" />}
                <h2 className="text-xl font-semibold text-white">
                  {analysisType === 'recipe' && 'Recipe Details'}
                  {analysisType === 'groceries' && 'Grocery List'}
                  {analysisType === 'nutrients' && 'Nutritional Analysis'}
                </h2>
              </div>
              
              {analysisType === 'recipe' && renderRecipeResult(result)}
              {analysisType === 'groceries' && renderGroceryResult(result)}
              {analysisType === 'nutrients' && renderNutrientResult(result)}

              <button
                onClick={() => {
                  setResult(null);
                  setAnalysisType(null);
                }}
                className="mt-6 text-white/50 hover:text-white transition-colors"
              >
                ← Back to options
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeGeneration;