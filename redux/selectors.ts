import { createSelector } from "reselect";
import { RootState } from "./store";

export const selectCurrentIngredients = createSelector(
  (state: RootState, currentRecipeId?: string) =>
    state.recipe.currentRecipeId ?? currentRecipeId ?? "",
  (state: RootState) => state.recipe.recipes,
  (state: RootState) => state.ingredients,
  (currentRecipeId, recipes, ingredients) =>
    recipes[currentRecipeId].ingredients.map(({ id, quantity }) => ({
      ...ingredients.values[id],
      quantity,
    }))
);

export const selectCurrentIngredientsIds = createSelector(
  (state: RootState, currentRecipeId?: string) =>
    state.recipe.currentRecipeId ?? currentRecipeId ?? "",
  (state: RootState) => state.recipe.recipes,
  (state: RootState) => state.ingredients,
  (currentRecipeId, recipes, ingredients) =>
    recipes[currentRecipeId].ingredients.map(({ id }) => id)
);

export const selectAvailableIngredients = createSelector(
  (state: RootState) => state.ingredients,
  (state: RootState, ingredientType: string) => ingredientType,
  (ingredients, ingredientType) =>
    ingredients.ids
      .filter((id) => ingredients.values[id].type === ingredientType)
      .map((id) => ingredients.values[id])
);