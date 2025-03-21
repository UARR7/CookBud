import { create } from "zustand";

export const useMealStore = create(set => ({
  mealPlans: {},
  addMeal: (day, meal, mealData) => set(state => ({ mealPlans: { ...state.mealPlans, [`${day}-${meal}`]: mealData } })),
  removeMeal: (day, meal) => set(state => {
    const updatedPlans = { ...state.mealPlans };
    delete updatedPlans[`${day}-${meal}`];
    return { mealPlans: updatedPlans };
  }),
  editMeal: (day, meal, mealData) => set(state => ({ mealPlans: { ...state.mealPlans, [`${day}-${meal}`]: mealData } }))
}));
