import { useState, useMemo, useRef } from 'react'
import { Plus, X, Trash2, Utensils, Target, ChevronDown, ChevronUp, Sparkles, Minus, Camera, ScanBarcode } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { isSubscribed } from '../lib/subscription'
import {
  getFoodEntries, saveFoodEntry, deleteFoodEntry,
  getMacroGoals, saveMacroGoals,
  getBodyStats, saveBodyStats, calculateMacros,
  type BodyStats,
} from '../lib/storage'

type QuickFood = {
  name: string
  emoji: string
  serving: string
  calories: number
  protein: number
  carbs: number
  fat: number
  category: 'protein' | 'carbs' | 'fats' | 'other'
  keywords: string[]
}

const COMMON_FOODS: QuickFood[] = [
  // ── PROTEIN — Poultry ──
  { name: 'Chicken Breast', emoji: '🍗', serving: '4 oz', calories: 187, protein: 35, carbs: 0, fat: 4, category: 'protein', keywords: ['chicken', 'breast', 'grilled', 'baked', 'poultry'] },
  { name: 'Chicken Thigh', emoji: '🍗', serving: '4 oz', calories: 220, protein: 26, carbs: 0, fat: 12, category: 'protein', keywords: ['thigh', 'dark meat', 'chicken thigh', 'poultry'] },
  { name: 'Chicken Wings', emoji: '🍗', serving: '4 wings', calories: 240, protein: 20, carbs: 0, fat: 16, category: 'protein', keywords: ['wings', 'chicken wings', 'buffalo', 'poultry'] },
  { name: 'Ground Turkey', emoji: '🍖', serving: '4 oz', calories: 170, protein: 22, carbs: 0, fat: 9, category: 'protein', keywords: ['turkey', 'ground', 'lean', 'meat', 'poultry'] },
  { name: 'Turkey Breast', emoji: '🍖', serving: '4 oz', calories: 153, protein: 34, carbs: 0, fat: 1, category: 'protein', keywords: ['turkey breast', 'deli', 'sliced', 'poultry'] },
  // ── PROTEIN — Beef & Red Meat ──
  { name: 'Steak', emoji: '🥩', serving: '4 oz', calories: 250, protein: 26, carbs: 0, fat: 15, category: 'protein', keywords: ['steak', 'beef', 'sirloin', 'ribeye', 'filet', 'red meat', 'ny strip', 'flank'] },
  { name: 'Ground Beef (lean)', emoji: '🥩', serving: '4 oz', calories: 200, protein: 22, carbs: 0, fat: 12, category: 'protein', keywords: ['ground beef', 'lean beef', '90/10', '93/7', 'hamburger', 'burger'] },
  { name: 'Ground Beef (regular)', emoji: '🥩', serving: '4 oz', calories: 280, protein: 19, carbs: 0, fat: 22, category: 'protein', keywords: ['ground beef', 'hamburger', 'burger', 'patty', '80/20'] },
  { name: 'Bison', emoji: '🥩', serving: '4 oz', calories: 166, protein: 24, carbs: 0, fat: 8, category: 'protein', keywords: ['bison', 'buffalo', 'red meat', 'lean'] },
  { name: 'Lamb', emoji: '🥩', serving: '4 oz', calories: 250, protein: 25, carbs: 0, fat: 17, category: 'protein', keywords: ['lamb', 'lamb chop', 'red meat'] },
  { name: 'Venison', emoji: '🥩', serving: '4 oz', calories: 158, protein: 30, carbs: 0, fat: 3, category: 'protein', keywords: ['venison', 'deer', 'game', 'red meat'] },
  // ── PROTEIN — Pork ──
  { name: 'Pork Chop', emoji: '🍖', serving: '4 oz', calories: 200, protein: 26, carbs: 0, fat: 10, category: 'protein', keywords: ['pork', 'pork chop', 'chop', 'grilled'] },
  { name: 'Pork Tenderloin', emoji: '🍖', serving: '4 oz', calories: 165, protein: 26, carbs: 0, fat: 6, category: 'protein', keywords: ['pork', 'tenderloin', 'pork loin', 'lean'] },
  { name: 'Bacon', emoji: '🥓', serving: '3 slices', calories: 129, protein: 9, carbs: 0, fat: 10, category: 'protein', keywords: ['bacon', 'pork', 'breakfast'] },
  { name: 'Turkey Bacon', emoji: '🥓', serving: '3 slices', calories: 90, protein: 10, carbs: 0, fat: 5, category: 'protein', keywords: ['turkey bacon', 'bacon', 'lean', 'breakfast'] },
  { name: 'Sausage', emoji: '🌭', serving: '2 links', calories: 220, protein: 12, carbs: 2, fat: 18, category: 'protein', keywords: ['sausage', 'breakfast sausage', 'links', 'pork'] },
  // ── PROTEIN — Fish & Seafood ──
  { name: 'Salmon', emoji: '🐟', serving: '4 oz', calories: 234, protein: 25, carbs: 0, fat: 14, category: 'protein', keywords: ['salmon', 'fish', 'seafood', 'grilled', 'baked', 'atlantic', 'sockeye'] },
  { name: 'Tuna (canned)', emoji: '🐠', serving: '1 can', calories: 191, protein: 42, carbs: 0, fat: 1, category: 'protein', keywords: ['tuna', 'canned tuna', 'fish', 'seafood'] },
  { name: 'Tuna Steak', emoji: '🐠', serving: '4 oz', calories: 150, protein: 34, carbs: 0, fat: 1, category: 'protein', keywords: ['tuna', 'tuna steak', 'ahi', 'yellowfin', 'fish', 'seafood', 'grilled'] },
  { name: 'Tilapia', emoji: '🐟', serving: '4 oz', calories: 110, protein: 23, carbs: 0, fat: 2, category: 'protein', keywords: ['tilapia', 'fish', 'seafood', 'white fish', 'baked', 'grilled'] },
  { name: 'Cod', emoji: '🐟', serving: '4 oz', calories: 100, protein: 23, carbs: 0, fat: 1, category: 'protein', keywords: ['cod', 'fish', 'seafood', 'white fish', 'baked'] },
  { name: 'Catfish', emoji: '🐟', serving: '4 oz', calories: 150, protein: 19, carbs: 0, fat: 8, category: 'protein', keywords: ['catfish', 'fish', 'seafood', 'fried', 'baked', 'southern'] },
  { name: 'Mahi-Mahi', emoji: '🐟', serving: '4 oz', calories: 100, protein: 22, carbs: 0, fat: 1, category: 'protein', keywords: ['mahi', 'mahi-mahi', 'dolphinfish', 'fish', 'seafood', 'grilled'] },
  { name: 'Halibut', emoji: '🐟', serving: '4 oz', calories: 120, protein: 23, carbs: 0, fat: 3, category: 'protein', keywords: ['halibut', 'fish', 'seafood', 'white fish'] },
  { name: 'Swordfish', emoji: '🐟', serving: '4 oz', calories: 146, protein: 24, carbs: 0, fat: 5, category: 'protein', keywords: ['swordfish', 'fish', 'seafood', 'grilled'] },
  { name: 'Sea Bass', emoji: '🐟', serving: '4 oz', calories: 110, protein: 21, carbs: 0, fat: 2, category: 'protein', keywords: ['sea bass', 'bass', 'fish', 'seafood', 'white fish'] },
  { name: 'Trout', emoji: '🐟', serving: '4 oz', calories: 168, protein: 24, carbs: 0, fat: 7, category: 'protein', keywords: ['trout', 'rainbow trout', 'fish', 'seafood'] },
  { name: 'Sardines', emoji: '🐟', serving: '1 can', calories: 190, protein: 22, carbs: 0, fat: 11, category: 'protein', keywords: ['sardines', 'canned', 'fish', 'seafood'] },
  { name: 'Shrimp', emoji: '🦐', serving: '4 oz', calories: 120, protein: 23, carbs: 1, fat: 2, category: 'protein', keywords: ['shrimp', 'prawns', 'seafood', 'grilled', 'boiled'] },
  { name: 'Crab', emoji: '🦀', serving: '4 oz', calories: 98, protein: 20, carbs: 0, fat: 1, category: 'protein', keywords: ['crab', 'crab meat', 'seafood', 'crab legs'] },
  { name: 'Lobster', emoji: '🦞', serving: '4 oz', calories: 100, protein: 21, carbs: 0, fat: 1, category: 'protein', keywords: ['lobster', 'lobster tail', 'seafood'] },
  { name: 'Scallops', emoji: '🐚', serving: '4 oz', calories: 100, protein: 20, carbs: 3, fat: 1, category: 'protein', keywords: ['scallops', 'seafood', 'seared'] },
  { name: 'Clams', emoji: '🐚', serving: '4 oz', calories: 84, protein: 14, carbs: 3, fat: 1, category: 'protein', keywords: ['clams', 'shellfish', 'seafood'] },
  { name: 'Fish Sticks', emoji: '🐟', serving: '4 sticks', calories: 200, protein: 10, carbs: 18, fat: 10, category: 'protein', keywords: ['fish sticks', 'fish fingers', 'breaded', 'frozen', 'fish'] },
  // ── PROTEIN — Eggs & Dairy ──
  { name: 'Eggs', emoji: '🥚', serving: '2 large', calories: 144, protein: 12, carbs: 1, fat: 10, category: 'protein', keywords: ['eggs', 'egg', 'scrambled', 'fried', 'boiled', 'omelet', 'over easy'] },
  { name: 'Egg Whites', emoji: '🥚', serving: '4 large', calories: 68, protein: 14, carbs: 1, fat: 0, category: 'protein', keywords: ['egg whites', 'whites', 'egg'] },
  { name: 'Greek Yogurt', emoji: '🥛', serving: '1 cup', calories: 130, protein: 22, carbs: 8, fat: 0, category: 'protein', keywords: ['yogurt', 'greek', 'dairy', 'fage', 'chobani'] },
  { name: 'Cottage Cheese', emoji: '🧀', serving: '1 cup', calories: 206, protein: 28, carbs: 8, fat: 9, category: 'protein', keywords: ['cottage', 'cheese', 'dairy'] },
  { name: 'Protein Shake', emoji: '🥤', serving: '1 scoop', calories: 120, protein: 24, carbs: 3, fat: 1, category: 'protein', keywords: ['protein', 'shake', 'whey', 'powder', 'smoothie', 'casein'] },
  // ── PROTEIN — Plant-based ──
  { name: 'Tofu', emoji: '🧊', serving: '4 oz', calories: 90, protein: 10, carbs: 2, fat: 5, category: 'protein', keywords: ['tofu', 'soy', 'plant', 'vegan', 'vegetarian'] },
  { name: 'Tempeh', emoji: '🧊', serving: '4 oz', calories: 220, protein: 21, carbs: 8, fat: 13, category: 'protein', keywords: ['tempeh', 'soy', 'plant', 'vegan', 'fermented'] },
  { name: 'Black Beans', emoji: '🫘', serving: '1 cup', calories: 227, protein: 15, carbs: 41, fat: 1, category: 'protein', keywords: ['black beans', 'beans', 'legumes', 'plant protein'] },
  { name: 'Lentils', emoji: '🫘', serving: '1 cup', calories: 230, protein: 18, carbs: 40, fat: 1, category: 'protein', keywords: ['lentils', 'dal', 'legumes', 'plant protein'] },
  { name: 'Chickpeas', emoji: '🫘', serving: '1 cup', calories: 269, protein: 15, carbs: 45, fat: 4, category: 'protein', keywords: ['chickpeas', 'garbanzo', 'hummus', 'legumes'] },

  // ── CARBS — Grains & Starches ──
  { name: 'Rice (white)', emoji: '🍚', serving: '1 cup', calories: 206, protein: 4, carbs: 45, fat: 0, category: 'carbs', keywords: ['rice', 'white rice', 'jasmine', 'basmati'] },
  { name: 'Brown Rice', emoji: '🍚', serving: '1 cup', calories: 216, protein: 5, carbs: 45, fat: 2, category: 'carbs', keywords: ['brown rice', 'whole grain', 'rice'] },
  { name: 'Quinoa', emoji: '🍚', serving: '1 cup', calories: 222, protein: 8, carbs: 39, fat: 4, category: 'carbs', keywords: ['quinoa', 'grain', 'whole grain'] },
  { name: 'Oatmeal', emoji: '🥣', serving: '1 cup', calories: 154, protein: 5, carbs: 27, fat: 3, category: 'carbs', keywords: ['oatmeal', 'oats', 'porridge', 'breakfast'] },
  { name: 'Grits', emoji: '🥣', serving: '1 cup', calories: 182, protein: 4, carbs: 38, fat: 1, category: 'carbs', keywords: ['grits', 'corn grits', 'breakfast', 'southern'] },
  { name: 'Pasta', emoji: '🍝', serving: '1 cup', calories: 220, protein: 8, carbs: 43, fat: 1, category: 'carbs', keywords: ['pasta', 'spaghetti', 'noodles', 'penne', 'macaroni', 'rigatoni', 'linguine', 'fettuccine'] },
  { name: 'Whole Wheat Pasta', emoji: '🍝', serving: '1 cup', calories: 174, protein: 7, carbs: 37, fat: 1, category: 'carbs', keywords: ['whole wheat pasta', 'wheat', 'pasta', 'noodles'] },
  { name: 'Bread (white)', emoji: '🍞', serving: '2 slices', calories: 150, protein: 4, carbs: 28, fat: 2, category: 'carbs', keywords: ['bread', 'white bread', 'toast', 'sandwich'] },
  { name: 'Bread (wheat)', emoji: '🍞', serving: '2 slices', calories: 140, protein: 6, carbs: 24, fat: 2, category: 'carbs', keywords: ['wheat bread', 'whole wheat', 'bread', 'toast', 'sandwich'] },
  { name: 'Bagel', emoji: '🥯', serving: '1 bagel', calories: 270, protein: 10, carbs: 53, fat: 2, category: 'carbs', keywords: ['bagel', 'breakfast', 'bread'] },
  { name: 'English Muffin', emoji: '🍞', serving: '1 muffin', calories: 132, protein: 5, carbs: 26, fat: 1, category: 'carbs', keywords: ['english muffin', 'muffin', 'breakfast', 'bread'] },
  { name: 'Tortilla (flour)', emoji: '🫓', serving: '1 large', calories: 140, protein: 4, carbs: 24, fat: 3, category: 'carbs', keywords: ['tortilla', 'wrap', 'burrito', 'flour'] },
  { name: 'Tortilla (corn)', emoji: '🫓', serving: '2 tortillas', calories: 110, protein: 3, carbs: 23, fat: 1, category: 'carbs', keywords: ['corn tortilla', 'tortilla', 'taco'] },
  { name: 'Pancakes', emoji: '🥞', serving: '2 pancakes', calories: 260, protein: 6, carbs: 38, fat: 10, category: 'carbs', keywords: ['pancakes', 'flapjacks', 'breakfast'] },
  { name: 'Waffles', emoji: '🧇', serving: '2 waffles', calories: 280, protein: 6, carbs: 40, fat: 11, category: 'carbs', keywords: ['waffles', 'waffle', 'breakfast'] },
  { name: 'Cereal', emoji: '🥣', serving: '1 cup', calories: 150, protein: 3, carbs: 33, fat: 1, category: 'carbs', keywords: ['cereal', 'breakfast', 'cheerios', 'flakes'] },
  { name: 'Granola', emoji: '🥣', serving: '1/2 cup', calories: 200, protein: 5, carbs: 29, fat: 8, category: 'carbs', keywords: ['granola', 'cereal', 'clusters'] },
  { name: 'Granola Bar', emoji: '🍫', serving: '1 bar', calories: 190, protein: 3, carbs: 29, fat: 7, category: 'carbs', keywords: ['granola', 'bar', 'snack', 'nature valley'] },
  { name: 'Couscous', emoji: '🍚', serving: '1 cup', calories: 176, protein: 6, carbs: 36, fat: 0, category: 'carbs', keywords: ['couscous', 'grain', 'pasta'] },
  // ── CARBS — Potatoes & Starchy Veggies ──
  { name: 'Potato (baked)', emoji: '🥔', serving: '1 medium', calories: 163, protein: 4, carbs: 37, fat: 0, category: 'carbs', keywords: ['potato', 'baked', 'baked potato'] },
  { name: 'Mashed Potatoes', emoji: '🥔', serving: '1 cup', calories: 210, protein: 4, carbs: 35, fat: 7, category: 'carbs', keywords: ['mashed', 'potato', 'mashed potatoes'] },
  { name: 'French Fries', emoji: '🍟', serving: '1 medium', calories: 365, protein: 4, carbs: 48, fat: 17, category: 'carbs', keywords: ['fries', 'french fries', 'potato', 'fried'] },
  { name: 'Sweet Potato', emoji: '🍠', serving: '1 medium', calories: 103, protein: 2, carbs: 24, fat: 0, category: 'carbs', keywords: ['sweet potato', 'yam'] },
  { name: 'Corn', emoji: '🌽', serving: '1 ear', calories: 90, protein: 3, carbs: 19, fat: 1, category: 'carbs', keywords: ['corn', 'corn on the cob', 'maize', 'vegetable'] },
  { name: 'Peas', emoji: '🟢', serving: '1 cup', calories: 118, protein: 8, carbs: 21, fat: 1, category: 'carbs', keywords: ['peas', 'green peas', 'vegetable'] },
  // ── CARBS — Fruits ──
  { name: 'Banana', emoji: '🍌', serving: '1 medium', calories: 105, protein: 1, carbs: 27, fat: 0, category: 'carbs', keywords: ['banana', 'fruit'] },
  { name: 'Apple', emoji: '🍎', serving: '1 medium', calories: 95, protein: 0, carbs: 25, fat: 0, category: 'carbs', keywords: ['apple', 'fruit', 'granny smith', 'fuji', 'gala', 'honeycrisp'] },
  { name: 'Orange', emoji: '🍊', serving: '1 medium', calories: 62, protein: 1, carbs: 15, fat: 0, category: 'carbs', keywords: ['orange', 'citrus', 'fruit', 'navel'] },
  { name: 'Tangerine', emoji: '🍊', serving: '1 medium', calories: 47, protein: 1, carbs: 12, fat: 0, category: 'carbs', keywords: ['tangerine', 'mandarin', 'clementine', 'citrus', 'fruit'] },
  { name: 'Grapefruit', emoji: '🍊', serving: '1/2', calories: 52, protein: 1, carbs: 13, fat: 0, category: 'carbs', keywords: ['grapefruit', 'citrus', 'fruit'] },
  { name: 'Strawberries', emoji: '🍓', serving: '1 cup', calories: 49, protein: 1, carbs: 12, fat: 0, category: 'carbs', keywords: ['strawberry', 'strawberries', 'berry', 'berries', 'fruit'] },
  { name: 'Blueberries', emoji: '🫐', serving: '1 cup', calories: 85, protein: 1, carbs: 21, fat: 0, category: 'carbs', keywords: ['blueberry', 'blueberries', 'berry', 'berries', 'fruit'] },
  { name: 'Raspberries', emoji: '🫐', serving: '1 cup', calories: 64, protein: 1, carbs: 15, fat: 1, category: 'carbs', keywords: ['raspberry', 'raspberries', 'berry', 'berries', 'fruit'] },
  { name: 'Blackberries', emoji: '🫐', serving: '1 cup', calories: 62, protein: 2, carbs: 14, fat: 1, category: 'carbs', keywords: ['blackberry', 'blackberries', 'berry', 'berries', 'fruit'] },
  { name: 'Mixed Berries', emoji: '🫐', serving: '1 cup', calories: 70, protein: 1, carbs: 17, fat: 0, category: 'carbs', keywords: ['mixed berries', 'berry', 'berries', 'fruit', 'frozen berries'] },
  { name: 'Grapes', emoji: '🍇', serving: '1 cup', calories: 104, protein: 1, carbs: 27, fat: 0, category: 'carbs', keywords: ['grapes', 'grape', 'red grapes', 'green grapes', 'fruit'] },
  { name: 'Watermelon', emoji: '🍉', serving: '1 cup', calories: 46, protein: 1, carbs: 12, fat: 0, category: 'carbs', keywords: ['watermelon', 'melon', 'fruit'] },
  { name: 'Cantaloupe', emoji: '🍈', serving: '1 cup', calories: 54, protein: 1, carbs: 13, fat: 0, category: 'carbs', keywords: ['cantaloupe', 'melon', 'fruit'] },
  { name: 'Honeydew', emoji: '🍈', serving: '1 cup', calories: 61, protein: 1, carbs: 16, fat: 0, category: 'carbs', keywords: ['honeydew', 'melon', 'fruit'] },
  { name: 'Pineapple', emoji: '🍍', serving: '1 cup', calories: 82, protein: 1, carbs: 22, fat: 0, category: 'carbs', keywords: ['pineapple', 'fruit', 'tropical'] },
  { name: 'Mango', emoji: '🥭', serving: '1 cup', calories: 99, protein: 1, carbs: 25, fat: 1, category: 'carbs', keywords: ['mango', 'fruit', 'tropical'] },
  { name: 'Peach', emoji: '🍑', serving: '1 medium', calories: 59, protein: 1, carbs: 14, fat: 0, category: 'carbs', keywords: ['peach', 'peaches', 'fruit', 'stone fruit'] },
  { name: 'Pear', emoji: '🍐', serving: '1 medium', calories: 101, protein: 1, carbs: 27, fat: 0, category: 'carbs', keywords: ['pear', 'pears', 'fruit'] },
  { name: 'Plum', emoji: '🫐', serving: '1 medium', calories: 30, protein: 0, carbs: 8, fat: 0, category: 'carbs', keywords: ['plum', 'plums', 'fruit', 'stone fruit'] },
  { name: 'Cherries', emoji: '🍒', serving: '1 cup', calories: 87, protein: 1, carbs: 22, fat: 0, category: 'carbs', keywords: ['cherry', 'cherries', 'fruit'] },
  { name: 'Kiwi', emoji: '🥝', serving: '1 medium', calories: 42, protein: 1, carbs: 10, fat: 0, category: 'carbs', keywords: ['kiwi', 'kiwifruit', 'fruit'] },
  { name: 'Pomegranate', emoji: '🫐', serving: '1/2 cup seeds', calories: 72, protein: 1, carbs: 16, fat: 1, category: 'carbs', keywords: ['pomegranate', 'seeds', 'fruit'] },
  { name: 'Papaya', emoji: '🥭', serving: '1 cup', calories: 55, protein: 1, carbs: 14, fat: 0, category: 'carbs', keywords: ['papaya', 'fruit', 'tropical'] },
  { name: 'Coconut (fresh)', emoji: '🥥', serving: '1/4 cup', calories: 133, protein: 1, carbs: 6, fat: 13, category: 'carbs', keywords: ['coconut', 'fresh coconut', 'fruit', 'tropical'] },
  { name: 'Dried Fruit', emoji: '🍇', serving: '1/4 cup', calories: 120, protein: 1, carbs: 31, fat: 0, category: 'carbs', keywords: ['dried fruit', 'raisins', 'cranberries', 'dates', 'apricots', 'fruit'] },
  { name: 'Applesauce', emoji: '🍎', serving: '1 cup', calories: 100, protein: 0, carbs: 27, fat: 0, category: 'carbs', keywords: ['applesauce', 'apple', 'fruit', 'sauce'] },
  { name: 'Fruit Salad', emoji: '🍓', serving: '1 cup', calories: 80, protein: 1, carbs: 20, fat: 0, category: 'carbs', keywords: ['fruit salad', 'mixed fruit', 'fruit cup', 'fruit'] },

  // ── FATS — Nuts & Seeds ──
  { name: 'Avocado', emoji: '🥑', serving: '1/2', calories: 117, protein: 1, carbs: 6, fat: 11, category: 'fats', keywords: ['avocado', 'guac', 'guacamole'] },
  { name: 'Peanut Butter', emoji: '🥜', serving: '2 tbsp', calories: 188, protein: 8, carbs: 6, fat: 16, category: 'fats', keywords: ['peanut butter', 'pb', 'nut butter'] },
  { name: 'Almond Butter', emoji: '🥜', serving: '2 tbsp', calories: 196, protein: 7, carbs: 6, fat: 18, category: 'fats', keywords: ['almond butter', 'nut butter'] },
  { name: 'Almonds', emoji: '🌰', serving: '1 oz', calories: 164, protein: 6, carbs: 6, fat: 14, category: 'fats', keywords: ['almonds', 'nuts'] },
  { name: 'Walnuts', emoji: '🌰', serving: '1 oz', calories: 185, protein: 4, carbs: 4, fat: 18, category: 'fats', keywords: ['walnuts', 'nuts'] },
  { name: 'Cashews', emoji: '🌰', serving: '1 oz', calories: 157, protein: 5, carbs: 9, fat: 12, category: 'fats', keywords: ['cashews', 'nuts'] },
  { name: 'Pecans', emoji: '🌰', serving: '1 oz', calories: 196, protein: 3, carbs: 4, fat: 20, category: 'fats', keywords: ['pecans', 'nuts'] },
  { name: 'Peanuts', emoji: '🥜', serving: '1 oz', calories: 161, protein: 7, carbs: 5, fat: 14, category: 'fats', keywords: ['peanuts', 'nuts'] },
  { name: 'Mixed Nuts', emoji: '🌰', serving: '1 oz', calories: 172, protein: 5, carbs: 6, fat: 15, category: 'fats', keywords: ['mixed nuts', 'trail mix', 'nuts'] },
  { name: 'Chia Seeds', emoji: '🌱', serving: '2 tbsp', calories: 138, protein: 5, carbs: 12, fat: 9, category: 'fats', keywords: ['chia', 'chia seeds', 'seeds'] },
  { name: 'Flax Seeds', emoji: '🌱', serving: '2 tbsp', calories: 110, protein: 4, carbs: 6, fat: 9, category: 'fats', keywords: ['flax', 'flaxseed', 'seeds'] },
  { name: 'Sunflower Seeds', emoji: '🌻', serving: '1 oz', calories: 165, protein: 6, carbs: 7, fat: 14, category: 'fats', keywords: ['sunflower', 'seeds'] },
  { name: 'Pumpkin Seeds', emoji: '🌱', serving: '1 oz', calories: 158, protein: 9, carbs: 3, fat: 14, category: 'fats', keywords: ['pumpkin seeds', 'pepitas', 'seeds'] },
  { name: 'Hemp Seeds', emoji: '🌱', serving: '3 tbsp', calories: 166, protein: 10, carbs: 2, fat: 14, category: 'fats', keywords: ['hemp', 'hemp seeds', 'hemp hearts', 'seeds', 'superfood'] },
  { name: 'Acai Bowl', emoji: '🫐', serving: '1 bowl', calories: 300, protein: 4, carbs: 52, fat: 10, category: 'other', keywords: ['acai', 'acai bowl', 'superfood', 'bowl', 'breakfast'] },
  { name: 'Spirulina', emoji: '🌱', serving: '1 tbsp', calories: 20, protein: 4, carbs: 2, fat: 0, category: 'other', keywords: ['spirulina', 'algae', 'superfood', 'supplement'] },
  { name: 'Goji Berries', emoji: '🫐', serving: '1 oz', calories: 98, protein: 4, carbs: 22, fat: 0, category: 'carbs', keywords: ['goji', 'goji berries', 'berries', 'superfood', 'dried', 'fruit'] },
  { name: 'Turmeric (powder)', emoji: '🌱', serving: '1 tsp', calories: 9, protein: 0, carbs: 2, fat: 0, category: 'other', keywords: ['turmeric', 'spice', 'superfood', 'anti-inflammatory'] },
  { name: 'Matcha', emoji: '🍵', serving: '1 tsp', calories: 5, protein: 1, carbs: 1, fat: 0, category: 'other', keywords: ['matcha', 'green tea', 'tea', 'superfood', 'caffeine'] },
  { name: 'Cacao Nibs', emoji: '🍫', serving: '1 oz', calories: 130, protein: 4, carbs: 10, fat: 12, category: 'fats', keywords: ['cacao', 'cacao nibs', 'chocolate', 'superfood', 'raw'] },
  // ── FATS — Oils, Dairy & Other ──
  { name: 'Olive Oil', emoji: '🫒', serving: '1 tbsp', calories: 119, protein: 0, carbs: 0, fat: 14, category: 'fats', keywords: ['olive oil', 'oil', 'cooking oil', 'evoo'] },
  { name: 'Coconut Oil', emoji: '🥥', serving: '1 tbsp', calories: 121, protein: 0, carbs: 0, fat: 14, category: 'fats', keywords: ['coconut oil', 'oil', 'cooking oil'] },
  { name: 'Butter', emoji: '🧈', serving: '1 tbsp', calories: 102, protein: 0, carbs: 0, fat: 12, category: 'fats', keywords: ['butter'] },
  { name: 'Cheese', emoji: '🧀', serving: '1 oz', calories: 113, protein: 7, carbs: 0, fat: 9, category: 'fats', keywords: ['cheese', 'cheddar', 'mozzarella', 'swiss', 'provolone', 'pepper jack', 'american'] },
  { name: 'Cream Cheese', emoji: '🧀', serving: '2 tbsp', calories: 100, protein: 2, carbs: 1, fat: 10, category: 'fats', keywords: ['cream cheese', 'cheese', 'spread', 'bagel'] },
  { name: 'Sour Cream', emoji: '🥛', serving: '2 tbsp', calories: 60, protein: 1, carbs: 1, fat: 5, category: 'fats', keywords: ['sour cream', 'cream', 'topping'] },
  { name: 'Mayo', emoji: '🥫', serving: '1 tbsp', calories: 94, protein: 0, carbs: 0, fat: 10, category: 'fats', keywords: ['mayo', 'mayonnaise', 'condiment'] },
  { name: 'Ranch Dressing', emoji: '🥗', serving: '2 tbsp', calories: 129, protein: 0, carbs: 2, fat: 13, category: 'fats', keywords: ['ranch', 'dressing', 'salad dressing', 'condiment'] },
  { name: 'Dark Chocolate', emoji: '🍫', serving: '1 oz', calories: 170, protein: 2, carbs: 13, fat: 12, category: 'fats', keywords: ['chocolate', 'dark chocolate', 'snack', 'dessert'] },

  // ── OTHER — Vegetables ──
  { name: 'Broccoli', emoji: '🥦', serving: '1 cup', calories: 55, protein: 4, carbs: 11, fat: 1, category: 'other', keywords: ['broccoli', 'vegetable', 'veggie'] },
  { name: 'Spinach', emoji: '🥬', serving: '2 cups', calories: 14, protein: 2, carbs: 2, fat: 0, category: 'other', keywords: ['spinach', 'greens', 'leafy', 'vegetable'] },
  { name: 'Kale', emoji: '🥬', serving: '2 cups', calories: 18, protein: 2, carbs: 3, fat: 0, category: 'other', keywords: ['kale', 'greens', 'leafy', 'vegetable'] },
  { name: 'Mixed Salad', emoji: '🥗', serving: '2 cups', calories: 20, protein: 2, carbs: 4, fat: 0, category: 'other', keywords: ['salad', 'greens', 'lettuce', 'mixed', 'vegetable'] },
  { name: 'Green Beans', emoji: '🫛', serving: '1 cup', calories: 35, protein: 2, carbs: 7, fat: 0, category: 'other', keywords: ['green beans', 'string beans', 'vegetable', 'veggie'] },
  { name: 'Asparagus', emoji: '🥦', serving: '1 cup', calories: 27, protein: 3, carbs: 5, fat: 0, category: 'other', keywords: ['asparagus', 'vegetable', 'veggie'] },
  { name: 'Cauliflower', emoji: '🥦', serving: '1 cup', calories: 25, protein: 2, carbs: 5, fat: 0, category: 'other', keywords: ['cauliflower', 'vegetable', 'veggie'] },
  { name: 'Brussels Sprouts', emoji: '🥦', serving: '1 cup', calories: 56, protein: 4, carbs: 11, fat: 1, category: 'other', keywords: ['brussels sprouts', 'sprouts', 'vegetable', 'veggie'] },
  { name: 'Bell Pepper', emoji: '🫑', serving: '1 medium', calories: 31, protein: 1, carbs: 7, fat: 0, category: 'other', keywords: ['pepper', 'bell pepper', 'red pepper', 'green pepper', 'vegetable'] },
  { name: 'Tomato', emoji: '🍅', serving: '1 medium', calories: 22, protein: 1, carbs: 5, fat: 0, category: 'other', keywords: ['tomato', 'tomatoes', 'vegetable'] },
  { name: 'Cucumber', emoji: '🥒', serving: '1 cup', calories: 16, protein: 1, carbs: 4, fat: 0, category: 'other', keywords: ['cucumber', 'vegetable', 'veggie'] },
  { name: 'Zucchini', emoji: '🥒', serving: '1 cup', calories: 20, protein: 2, carbs: 4, fat: 0, category: 'other', keywords: ['zucchini', 'squash', 'vegetable', 'veggie'] },
  { name: 'Carrots', emoji: '🥕', serving: '1 cup', calories: 52, protein: 1, carbs: 12, fat: 0, category: 'other', keywords: ['carrots', 'carrot', 'vegetable', 'veggie'] },
  { name: 'Celery', emoji: '🥬', serving: '1 cup', calories: 14, protein: 1, carbs: 3, fat: 0, category: 'other', keywords: ['celery', 'vegetable', 'veggie', 'snack'] },
  { name: 'Mushrooms', emoji: '🍄', serving: '1 cup', calories: 22, protein: 3, carbs: 3, fat: 0, category: 'other', keywords: ['mushrooms', 'mushroom', 'vegetable', 'veggie'] },
  { name: 'Onion', emoji: '🧅', serving: '1 medium', calories: 44, protein: 1, carbs: 10, fat: 0, category: 'other', keywords: ['onion', 'onions', 'vegetable', 'veggie'] },
  { name: 'Cabbage', emoji: '🥬', serving: '1 cup', calories: 22, protein: 1, carbs: 5, fat: 0, category: 'other', keywords: ['cabbage', 'coleslaw', 'vegetable'] },
  { name: 'Avocado (whole)', emoji: '🥑', serving: '1 whole', calories: 234, protein: 3, carbs: 12, fat: 21, category: 'other', keywords: ['avocado', 'whole avocado', 'vegetable'] },
  // ── OTHER — Drinks ──
  { name: 'Milk (whole)', emoji: '🥛', serving: '1 cup', calories: 149, protein: 8, carbs: 12, fat: 8, category: 'other', keywords: ['milk', 'whole milk', 'dairy'] },
  { name: 'Milk (2%)', emoji: '🥛', serving: '1 cup', calories: 122, protein: 8, carbs: 12, fat: 5, category: 'other', keywords: ['milk', '2%', 'reduced fat', 'dairy'] },
  { name: 'Milk (skim)', emoji: '🥛', serving: '1 cup', calories: 83, protein: 8, carbs: 12, fat: 0, category: 'other', keywords: ['milk', 'skim', 'fat free', 'nonfat', 'dairy'] },
  { name: 'Almond Milk', emoji: '🥛', serving: '1 cup', calories: 39, protein: 1, carbs: 4, fat: 3, category: 'other', keywords: ['almond milk', 'milk', 'plant milk', 'dairy free'] },
  { name: 'Oat Milk', emoji: '🥛', serving: '1 cup', calories: 120, protein: 3, carbs: 16, fat: 5, category: 'other', keywords: ['oat milk', 'milk', 'plant milk', 'dairy free'] },
  { name: 'Orange Juice', emoji: '🍊', serving: '1 cup', calories: 112, protein: 2, carbs: 26, fat: 0, category: 'other', keywords: ['orange juice', 'oj', 'juice', 'fruit'] },
  { name: 'Apple Juice', emoji: '🍎', serving: '1 cup', calories: 114, protein: 0, carbs: 28, fat: 0, category: 'other', keywords: ['apple juice', 'juice', 'fruit'] },
  { name: 'Coffee (black)', emoji: '☕', serving: '1 cup', calories: 2, protein: 0, carbs: 0, fat: 0, category: 'other', keywords: ['coffee', 'black coffee', 'caffeine'] },
  { name: 'Coffee w/ Cream', emoji: '☕', serving: '1 cup', calories: 52, protein: 1, carbs: 1, fat: 5, category: 'other', keywords: ['coffee', 'latte', 'cream', 'creamer'] },
  { name: 'Smoothie', emoji: '🥤', serving: '16 oz', calories: 250, protein: 5, carbs: 50, fat: 3, category: 'other', keywords: ['smoothie', 'fruit smoothie', 'blended', 'shake'] },
  { name: 'Sports Drink', emoji: '🥤', serving: '20 oz', calories: 140, protein: 0, carbs: 36, fat: 0, category: 'other', keywords: ['gatorade', 'sports drink', 'electrolytes', 'powerade'] },
  { name: 'Soda', emoji: '🥤', serving: '12 oz', calories: 140, protein: 0, carbs: 39, fat: 0, category: 'other', keywords: ['soda', 'coke', 'pepsi', 'sprite', 'soft drink'] },
  // ── OTHER — Meals & Combos ──
  { name: 'Chicken & Rice', emoji: '🍛', serving: '1 bowl', calories: 450, protein: 35, carbs: 50, fat: 8, category: 'other', keywords: ['chicken and rice', 'chicken rice', 'bowl', 'meal'] },
  { name: 'Protein Bowl', emoji: '🥗', serving: '1 bowl', calories: 520, protein: 40, carbs: 45, fat: 15, category: 'other', keywords: ['protein bowl', 'chipotle', 'burrito bowl', 'bowl', 'meal'] },
  { name: 'Turkey Burger', emoji: '🍔', serving: '1 burger', calories: 350, protein: 28, carbs: 28, fat: 14, category: 'other', keywords: ['turkey burger', 'burger', 'meal'] },
  { name: 'Hamburger', emoji: '🍔', serving: '1 burger', calories: 450, protein: 25, carbs: 30, fat: 25, category: 'other', keywords: ['hamburger', 'burger', 'cheeseburger', 'meal'] },
  { name: 'Grilled Chicken Salad', emoji: '🥗', serving: '1 bowl', calories: 350, protein: 30, carbs: 15, fat: 18, category: 'other', keywords: ['chicken salad', 'grilled', 'salad', 'meal'] },
  { name: 'Tacos', emoji: '🌮', serving: '2 tacos', calories: 340, protein: 18, carbs: 30, fat: 16, category: 'other', keywords: ['taco', 'tacos', 'mexican', 'meal'] },
  { name: 'Fish Tacos', emoji: '🌮', serving: '2 tacos', calories: 320, protein: 22, carbs: 28, fat: 14, category: 'other', keywords: ['fish tacos', 'tacos', 'fish', 'seafood', 'meal'] },
  { name: 'Burrito', emoji: '🌯', serving: '1 burrito', calories: 550, protein: 25, carbs: 60, fat: 22, category: 'other', keywords: ['burrito', 'mexican', 'meal', 'wrap'] },
  { name: 'Stir Fry', emoji: '🍳', serving: '1 bowl', calories: 400, protein: 25, carbs: 40, fat: 15, category: 'other', keywords: ['stir fry', 'asian', 'meal', 'rice'] },
  { name: 'Sandwich', emoji: '🥪', serving: '1 sandwich', calories: 400, protein: 22, carbs: 38, fat: 18, category: 'other', keywords: ['sandwich', 'sub', 'hoagie', 'deli', 'meal'] },
  { name: 'Pizza', emoji: '🍕', serving: '2 slices', calories: 570, protein: 24, carbs: 64, fat: 22, category: 'other', keywords: ['pizza', 'slice', 'meal'] },
  { name: 'Soup', emoji: '🥣', serving: '1 cup', calories: 150, protein: 8, carbs: 18, fat: 5, category: 'other', keywords: ['soup', 'chicken soup', 'broth', 'stew'] },
  { name: 'Protein Pancakes', emoji: '🥞', serving: '2 pancakes', calories: 250, protein: 24, carbs: 28, fat: 6, category: 'other', keywords: ['protein pancakes', 'pancakes', 'breakfast', 'meal'] },
  // ── OTHER — Snacks & Condiments ──
  { name: 'Hummus', emoji: '🫘', serving: '2 tbsp', calories: 70, protein: 2, carbs: 6, fat: 5, category: 'other', keywords: ['hummus', 'dip', 'snack', 'chickpea'] },
  { name: 'Salsa', emoji: '🫙', serving: '2 tbsp', calories: 10, protein: 0, carbs: 2, fat: 0, category: 'other', keywords: ['salsa', 'condiment', 'topping'] },
  { name: 'Guacamole', emoji: '🥑', serving: '2 tbsp', calories: 50, protein: 1, carbs: 3, fat: 5, category: 'other', keywords: ['guacamole', 'guac', 'avocado', 'dip'] },
  { name: 'Rice Cakes', emoji: '🍘', serving: '2 cakes', calories: 70, protein: 2, carbs: 14, fat: 1, category: 'other', keywords: ['rice cake', 'rice cakes', 'snack'] },
  { name: 'Beef Jerky', emoji: '🥩', serving: '1 oz', calories: 82, protein: 13, carbs: 3, fat: 2, category: 'other', keywords: ['jerky', 'beef jerky', 'snack', 'dried'] },
  { name: 'Protein Bar', emoji: '🍫', serving: '1 bar', calories: 220, protein: 20, carbs: 25, fat: 8, category: 'other', keywords: ['protein bar', 'bar', 'snack', 'quest', 'rxbar'] },
  { name: 'Honey', emoji: '🍯', serving: '1 tbsp', calories: 64, protein: 0, carbs: 17, fat: 0, category: 'other', keywords: ['honey', 'sweetener'] },
  { name: 'Maple Syrup', emoji: '🍁', serving: '2 tbsp', calories: 104, protein: 0, carbs: 27, fat: 0, category: 'other', keywords: ['maple syrup', 'syrup', 'pancake', 'sweetener'] },
]

function smartMatch(query: string): QuickFood[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const words = q.split(/[\s,&+]+/).filter(Boolean)
  const scored = COMMON_FOODS.map((food) => {
    let score = 0
    const name = food.name.toLowerCase()
    const allKeywords = [...food.keywords, name]
    if (name === q) score += 100
    if (name.startsWith(q)) score += 50
    for (const word of words) {
      if (name.includes(word)) score += 20
      for (const kw of allKeywords) {
        if (kw.includes(word)) score += 10
        if (kw.startsWith(word)) score += 5
      }
    }
    return { food, score }
  })
  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 8).map((s) => s.food)
}

export default function Nutrition() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const subscribed = user ? isSubscribed(user) : false
  const todayStr = new Date().toISOString().split('T')[0]
  const inputRef = useRef<HTMLInputElement>(null)
  const barcodeInputRef = useRef<HTMLInputElement>(null)

  const [selectedDate] = useState(todayStr)
  const [entries, setEntries] = useState(() => user ? getFoodEntries(user.id, selectedDate) : [])
  const [showAdd, setShowAdd] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [addedFood, setAddedFood] = useState<string | null>(null)
  const [servings, setServings] = useState<Record<string, number>>({})
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [scannedFood, setScannedFood] = useState<{ name: string; calories: number; protein: number; carbs: number; fat: number; serving: string } | null>(null)

  const [customName, setCustomName] = useState('')
  const [customCalories, setCustomCalories] = useState('')
  const [customProtein, setCustomProtein] = useState('')
  const [customCarbs, setCustomCarbs] = useState('')
  const [customFat, setCustomFat] = useState('')

  const goals = user ? getMacroGoals(user.id) : { calories: 2500, protein: 180, carbs: 280, fat: 80 }
  const [goalCalories, setGoalCalories] = useState(goals.calories.toString())
  const [goalProtein, setGoalProtein] = useState(goals.protein.toString())
  const [goalCarbs, setGoalCarbs] = useState(goals.carbs.toString())
  const [goalFat, setGoalFat] = useState(goals.fat.toString())

  const savedStats = user ? getBodyStats(user.id) : null
  const isFirstVisit = !savedStats
  const [showGoals, setShowGoals] = useState(isFirstVisit)
  const [calcTab, setCalcTab] = useState<'calc' | 'manual'>('calc')
  const [age, setAge] = useState(savedStats?.age?.toString() || '')
  const [gender, setGender] = useState<'male' | 'female'>(savedStats?.gender || 'male')
  const [heightFt, setHeightFt] = useState(savedStats?.heightFt?.toString() || '')
  const [heightIn, setHeightIn] = useState(savedStats?.heightIn?.toString() || '0')
  const [weightLbs, setWeightLbs] = useState(savedStats?.weightLbs?.toString() || '')
  const [activity, setActivity] = useState<BodyStats['activity']>(savedStats?.activity || 'moderate')
  const [nutritionGoal, setNutritionGoal] = useState<BodyStats['nutritionGoal']>(savedStats?.nutritionGoal || 'maintain')

  const totals = useMemo(() => {
    return entries.reduce(
      (acc, e) => ({ calories: acc.calories + e.calories, protein: acc.protein + e.protein, carbs: acc.carbs + e.carbs, fat: acc.fat + e.fat }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    )
  }, [entries])

  const refreshEntries = () => { if (user) setEntries(getFoodEntries(user.id, selectedDate)) }
  const getServingsCount = (name: string) => servings[name] || 1
  const adjustServings = (name: string, delta: number) => {
    setServings((prev) => ({ ...prev, [name]: Math.max(0.5, Math.min(10, (prev[name] || 1) + delta)) }))
  }

  const addQuickFood = (food: QuickFood) => {
    if (!user) return
    if (!subscribed) { navigate('/subscribe'); return }
    const qty = getServingsCount(food.name)
    const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    saveFoodEntry(user.id, {
      date: selectedDate, time,
      name: `${food.emoji} ${food.name}${qty !== 1 ? ` (x${qty})` : ''}`,
      calories: Math.round(food.calories * qty), protein: Math.round(food.protein * qty),
      carbs: Math.round(food.carbs * qty), fat: Math.round(food.fat * qty),
    })
    refreshEntries()
    setServings((prev) => ({ ...prev, [food.name]: 1 }))
    setAddedFood(food.name)
    setTimeout(() => setAddedFood(null), 1500)
  }

  const addCustomFood = () => {
    if (!user || !customName.trim() || !customCalories) return
    if (!subscribed) { navigate('/subscribe'); return }
    const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    saveFoodEntry(user.id, {
      date: selectedDate, time, name: customName.trim(),
      calories: parseInt(customCalories) || 0, protein: parseInt(customProtein) || 0,
      carbs: parseInt(customCarbs) || 0, fat: parseInt(customFat) || 0,
    })
    refreshEntries()
    setCustomName(''); setCustomCalories(''); setCustomProtein(''); setCustomCarbs(''); setCustomFat('')
    setShowCustom(false)
    setAddedFood(customName.trim())
    setTimeout(() => setAddedFood(null), 1500)
  }

  const addScannedFood = () => {
    if (!user || !scannedFood) return
    if (!subscribed) { navigate('/subscribe'); return }
    const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    saveFoodEntry(user.id, {
      date: selectedDate, time, name: scannedFood.name,
      calories: scannedFood.calories, protein: scannedFood.protein,
      carbs: scannedFood.carbs, fat: scannedFood.fat,
    })
    refreshEntries()
    setAddedFood(scannedFood.name)
    setScannedFood(null)
    setScanResult(null)
    setTimeout(() => setAddedFood(null), 1500)
  }

  const removeEntry = (id: string) => { if (user) { deleteFoodEntry(user.id, id); refreshEntries() } }

  const runCalculator = () => {
    if (!user || !age || !heightFt || !weightLbs) return
    const stats: BodyStats = {
      age: parseInt(age), gender, heightFt: parseInt(heightFt),
      heightIn: parseInt(heightIn) || 0, weightLbs: parseInt(weightLbs),
      activity, nutritionGoal,
    }
    saveBodyStats(user.id, stats)
    const result = calculateMacros(stats)
    saveMacroGoals(user.id, result)
    setGoalCalories(result.calories.toString())
    setGoalProtein(result.protein.toString())
    setGoalCarbs(result.carbs.toString())
    setGoalFat(result.fat.toString())
    setShowGoals(false)
    setAddedFood('Macros calculated!')
    setTimeout(() => setAddedFood(null), 2000)
  }

  const saveManualGoals = () => {
    if (!user) return
    saveMacroGoals(user.id, {
      calories: parseInt(goalCalories) || 2500, protein: parseInt(goalProtein) || 180,
      carbs: parseInt(goalCarbs) || 280, fat: parseInt(goalFat) || 80,
    })
    setShowGoals(false)
  }

  const lookupBarcode = async (code: string) => {
    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
      const data = await res.json()
      if (data.status === 1 && data.product) {
        const p = data.product
        const n = p.nutriments || {}
        const name = p.product_name || p.generic_name || 'Scanned Food'
        const servingSize = p.serving_size || '1 serving'
        const cal = Math.round(n['energy-kcal_serving'] || n['energy-kcal_100g'] || 0)
        const pro = Math.round(n.proteins_serving || n.proteins_100g || 0)
        const carb = Math.round(n.carbohydrates_serving || n.carbohydrates_100g || 0)
        const f = Math.round(n.fat_serving || n.fat_100g || 0)
        setScannedFood({ name, calories: cal, protein: pro, carbs: carb, fat: f, serving: servingSize })
        setScanResult(`Found: ${name} (${servingSize})`)
        return true
      }
    } catch { /* fall through */ }
    return false
  }

  const handleBarcodeScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setScanning(true)
    setScanResult(null)
    try {
      const { BarcodeDetector } = await import('barcode-detector/pure')
      const bitmap = await createImageBitmap(file)
      const detector = new BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39'] })
      const barcodes = await detector.detect(bitmap)
      if (barcodes.length > 0) {
        const code = barcodes[0].rawValue
        setScanResult(`Barcode found: ${code} — looking up nutrition...`)
        const found = await lookupBarcode(code)
        if (!found) {
          setScanResult(`Barcode ${code} not in database. Enter nutrition manually.`)
          setShowCustom(true); setShowAdd(true)
        }
      } else {
        setScanResult('No barcode detected. Make sure the barcode is clear and well-lit, then try again.')
        setShowCustom(true); setShowAdd(true)
      }
    } catch {
      setScanResult('Could not scan. Try again or enter manually.')
      setShowCustom(true); setShowAdd(true)
    }
    setScanning(false)
    if (barcodeInputRef.current) barcodeInputRef.current.value = ''
  }

  const smartResults = smartMatch(searchQuery)
  const showSmartResults = searchQuery.length >= 2 && smartResults.length > 0
  const filteredFoods = searchQuery
    ? COMMON_FOODS.filter((f) => {
        const q = searchQuery.toLowerCase()
        return f.name.toLowerCase().includes(q) || f.keywords.some((kw) => kw.includes(q))
      })
    : COMMON_FOODS

  const calPct = Math.min((totals.calories / goals.calories) * 100, 100)
  const calRemaining = Math.max(0, goals.calories - totals.calories)
  const ringRadius = 52
  const ringCircumference = 2 * Math.PI * ringRadius
  const ringOffset = ringCircumference - (calPct / 100) * ringCircumference

  const macros = [
    { label: 'Protein', value: totals.protein, goal: goals.protein, color: 'bg-cyan-400', textColor: 'text-cyan-400', unit: 'g' },
    { label: 'Carbs', value: totals.carbs, goal: goals.carbs, color: 'bg-blue-400', textColor: 'text-blue-400', unit: 'g' },
    { label: 'Fat', value: totals.fat, goal: goals.fat, color: 'bg-lime', textColor: 'text-lime', unit: 'g' },
  ]

  const activityLabels = { sedentary: 'Sedentary', light: 'Light', moderate: 'Moderate', active: 'Very Active', very_active: 'Extreme' }
  const goalLabels = { lose: 'Cut', gain: 'Build', maintain: 'Maintain' }

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <div className="sticky top-0 glass-heavy z-40 border-b border-border">
        <div className="px-5 pt-14 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight">Nutrition</h1>
              <p className="text-text-muted text-[10px] uppercase tracking-[0.2em]">
                {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
            </div>
            <button
              onClick={() => setShowGoals(!showGoals)}
              className="w-10 h-10 rounded-xl bg-bg-card border border-border flex items-center justify-center hover:border-lime/30 transition-colors"
            >
              <Target size={18} className={showGoals ? 'text-lime' : 'text-text-muted'} />
            </button>
          </div>
        </div>
      </div>

      {/* Goals / Calculator */}
      {showGoals && (
        <div className="px-5 pt-4 animate-slide-up">
          {isFirstVisit && (
            <div className="rounded-2xl bg-lime/5 border border-lime/20 p-4 mb-3">
              <p className="font-display font-bold text-sm text-lime mb-1">Set Up Your Nutrition</p>
              <p className="text-text-secondary text-xs leading-relaxed">Drop your stats and we'll set your macros. Simple.</p>
            </div>
          )}
          <div className="rounded-2xl bg-bg-card border border-lime/20 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-border">
              <button onClick={() => setCalcTab('calc')}
                className={`flex-1 py-3 text-xs font-display font-bold uppercase tracking-wider transition-colors ${calcTab === 'calc' ? 'text-lime border-b-2 border-lime' : 'text-text-muted'}`}>
                Smart Calculator
              </button>
              <button onClick={() => setCalcTab('manual')}
                className={`flex-1 py-3 text-xs font-display font-bold uppercase tracking-wider transition-colors ${calcTab === 'manual' ? 'text-lime border-b-2 border-lime' : 'text-text-muted'}`}>
                Manual
              </button>
            </div>

            {calcTab === 'calc' ? (
              <div className="p-4 space-y-3">
                <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-bold">Your Stats</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-text-muted text-[10px] uppercase tracking-wider block mb-1">Age</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25"
                      className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-lime/40" />
                  </div>
                  <div>
                    <label className="text-text-muted text-[10px] uppercase tracking-wider block mb-1">Gender</label>
                    <div className="flex gap-1">
                      {(['male', 'female'] as const).map((g) => (
                        <button key={g} onClick={() => setGender(g)}
                          className={`flex-1 py-2 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-colors ${gender === g ? 'bg-lime text-black' : 'bg-bg-elevated text-text-muted'}`}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-text-muted text-[10px] uppercase tracking-wider block mb-1">Height (ft)</label>
                    <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="5"
                      className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-lime/40" />
                  </div>
                  <div>
                    <label className="text-text-muted text-[10px] uppercase tracking-wider block mb-1">Height (in)</label>
                    <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="10"
                      className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-lime/40" />
                  </div>
                  <div>
                    <label className="text-text-muted text-[10px] uppercase tracking-wider block mb-1">Weight (lbs)</label>
                    <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} placeholder="180"
                      className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-lime/40" />
                  </div>
                </div>
                <div>
                  <label className="text-text-muted text-[10px] uppercase tracking-wider block mb-1">Activity Level</label>
                  <div className="grid grid-cols-2 gap-1">
                    {(Object.entries(activityLabels) as [BodyStats['activity'], string][]).map(([key, label]) => (
                      <button key={key} onClick={() => setActivity(key)}
                        className={`py-2 px-2 rounded-lg text-[10px] font-display font-bold uppercase tracking-wider transition-colors ${activity === key ? 'bg-lime text-black' : 'bg-bg-elevated text-text-muted'}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-text-muted text-[10px] uppercase tracking-wider block mb-1">Goal</label>
                  <div className="grid grid-cols-3 gap-1">
                    {(Object.entries(goalLabels) as [BodyStats['nutritionGoal'], string][]).map(([key, label]) => (
                      <button key={key} onClick={() => setNutritionGoal(key)}
                        className={`py-2.5 px-2 rounded-lg text-[10px] font-display font-bold uppercase tracking-wider transition-colors ${nutritionGoal === key ? 'bg-lime text-black' : 'bg-bg-elevated text-text-muted'}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={runCalculator} disabled={!age || !heightFt || !weightLbs}
                  className="w-full bg-lime text-black font-display font-bold text-sm uppercase tracking-wider py-2.5 rounded-xl active:scale-[0.98] transition-transform disabled:opacity-30">
                  Calculate My Macros
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-bold">Daily Goals</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Calories', value: goalCalories, setter: setGoalCalories },
                    { label: 'Protein (g)', value: goalProtein, setter: setGoalProtein },
                    { label: 'Carbs (g)', value: goalCarbs, setter: setGoalCarbs },
                    { label: 'Fat (g)', value: goalFat, setter: setGoalFat },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="text-text-muted text-[10px] uppercase tracking-wider block mb-1">{field.label}</label>
                      <input type="number" value={field.value} onChange={(e) => field.setter(e.target.value)}
                        className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-lime/40" />
                    </div>
                  ))}
                </div>
                <button onClick={saveManualGoals}
                  className="w-full bg-lime text-black font-display font-bold text-sm uppercase tracking-wider py-2.5 rounded-xl active:scale-[0.98] transition-transform">
                  Save Goals
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Macro dashboard */}
      <div className="px-5 pt-5 animate-fade-in">
        <div className="rounded-2xl bg-bg-card border border-border p-5">
          <div className="flex items-center gap-5">
            <div className="relative w-[120px] h-[120px] shrink-0">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r={ringRadius} fill="none" stroke="#1E1E1E" strokeWidth="8" />
                <circle cx="60" cy="60" r={ringRadius} fill="none" stroke="#B3FF1D" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={ringCircumference} strokeDashoffset={ringOffset}
                  className="transition-all duration-500 ease-out"
                  style={calPct >= 100 ? { filter: 'drop-shadow(0 0 8px rgba(179,255,29,0.4))' } : undefined}
                  opacity={calPct > 0 ? 1 : 0.15} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`font-display font-bold text-2xl leading-none ${calPct >= 100 ? 'text-lime' : ''}`}>{totals.calories}</span>
                <span className="text-text-muted text-[9px] uppercase tracking-wider mt-1">/ {goals.calories}</span>
                <span className="text-text-muted text-[8px] uppercase tracking-wider">cal</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {macros.map((macro) => {
                const pct = Math.min((macro.value / macro.goal) * 100, 100)
                return (
                  <div key={macro.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-text-secondary">{macro.label}</span>
                      <span className="text-[11px] font-display font-bold">
                        <span className={macro.textColor}>{macro.value}</span>
                        <span className="text-text-muted">/{macro.goal}{macro.unit}</span>
                      </span>
                    </div>
                    <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ease-out ${macro.color}`}
                        style={{ width: `${pct}%`, ...(pct >= 100 ? { filter: 'brightness(1.2)' } : {}) }} />
                    </div>
                  </div>
                )
              })}
              {calRemaining > 0 && <p className="text-text-muted text-[10px] mt-1">{calRemaining} cal remaining</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation toast */}
      {addedFood && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-lime text-black font-display font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-lime/20">{addedFood}</div>
        </div>
      )}

      {/* Smart search + scan buttons */}
      <div className="px-5 pt-4">
        <div className="relative">
          <Sparkles size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lime" />
          <input ref={inputRef} type="text" value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); if (!showAdd && e.target.value.length >= 2) setShowAdd(true) }}
            placeholder='Type what you ate... "chicken and rice"'
            className="w-full bg-bg-card border border-border rounded-xl pl-10 pr-10 py-3.5 text-sm text-text placeholder:text-text-muted/40 focus:outline-none focus:border-lime/40 transition-colors" />
          {searchQuery && (
            <button onClick={() => { setSearchQuery(''); inputRef.current?.focus() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-bg-elevated flex items-center justify-center">
              <X size={12} className="text-text-muted" />
            </button>
          )}
        </div>

        {/* Scan buttons */}
        <div className="flex gap-2 mt-2">
          <label className="flex-1 cursor-pointer">
            <input ref={barcodeInputRef} type="file" accept="image/*" capture="environment" onChange={handleBarcodeScan} className="hidden" />
            <div className="flex items-center justify-center gap-2 bg-bg-card border border-border rounded-xl py-3 hover:border-lime/30 transition-colors active:scale-[0.98]">
              {scanning ? (
                <div className="w-4 h-4 border-2 border-lime border-t-transparent rounded-full animate-spin" />
              ) : (
                <Camera size={16} className="text-cyan-400" />
              )}
              <span className="font-display font-bold text-xs">{scanning ? 'Scanning...' : 'Scan / Photo'}</span>
            </div>
          </label>
        </div>

        {scanResult && (
          <div className="mt-2 rounded-xl bg-cyan-400/10 border border-cyan-400/20 p-3 flex items-start gap-2">
            <ScanBarcode size={14} className="text-cyan-400 mt-0.5 shrink-0" />
            <p className="text-xs text-text-secondary">{scanResult}</p>
            <button onClick={() => setScanResult(null)} className="shrink-0"><X size={14} className="text-text-muted" /></button>
          </div>
        )}

        {/* Scanned food — Add to Macros card */}
        {scannedFood && (
          <div className="mt-3 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-lime/10 border border-cyan-400/30 p-4 animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <p className="text-lime text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-1">
                <ScanBarcode size={10} /> Scanned Food
              </p>
              <button onClick={() => { setScannedFood(null); setScanResult(null) }}>
                <X size={14} className="text-text-muted" />
              </button>
            </div>
            <p className="font-display font-bold text-base mb-1">{scannedFood.name}</p>
            <p className="text-text-muted text-[10px] mb-3">{scannedFood.serving}</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-bg-card rounded-lg px-3 py-1.5 text-center">
                <p className="text-lime font-bold text-sm">{scannedFood.calories}</p>
                <p className="text-text-muted text-[9px] uppercase">Cal</p>
              </div>
              <div className="bg-bg-card rounded-lg px-3 py-1.5 text-center">
                <p className="text-cyan-400 font-bold text-sm">{scannedFood.protein}g</p>
                <p className="text-text-muted text-[9px] uppercase">Protein</p>
              </div>
              <div className="bg-bg-card rounded-lg px-3 py-1.5 text-center">
                <p className="text-blue-400 font-bold text-sm">{scannedFood.carbs}g</p>
                <p className="text-text-muted text-[9px] uppercase">Carbs</p>
              </div>
              <div className="bg-bg-card rounded-lg px-3 py-1.5 text-center">
                <p className="text-text-secondary font-bold text-sm">{scannedFood.fat}g</p>
                <p className="text-text-muted text-[9px] uppercase">Fat</p>
              </div>
            </div>
            <button onClick={addScannedFood}
              className="w-full bg-lime text-black font-display font-bold text-sm uppercase tracking-wider py-3 rounded-xl active:scale-[0.97] transition-transform">
              Add to Macros
            </button>
          </div>
        )}

        {/* Smart match results */}
        {showSmartResults && (
          <div className="mt-2 space-y-1 animate-slide-up">
            <p className="text-lime text-[9px] uppercase tracking-[0.2em] font-bold mb-1.5 flex items-center gap-1">
              <Sparkles size={10} /> Matches
            </p>
            {smartResults.map((food) => {
              const qty = getServingsCount(food.name)
              return (
                <div key={food.name} className="rounded-xl bg-bg-card border border-border p-3 flex items-center gap-3">
                  <span className="text-xl shrink-0">{food.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm truncate">{food.name}</p>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-lime font-bold">{Math.round(food.calories * qty)} cal</span>
                      <span className="text-cyan-400">{Math.round(food.protein * qty)}P</span>
                      <span className="text-blue-400">{Math.round(food.carbs * qty)}C</span>
                      <span className="text-text-secondary">{Math.round(food.fat * qty)}F</span>
                      <span className="text-text-muted">· {food.serving}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => adjustServings(food.name, -0.5)} className="w-7 h-7 rounded-lg bg-bg-elevated flex items-center justify-center active:scale-90">
                      <Minus size={12} className="text-text-muted" />
                    </button>
                    <span className="text-xs font-display font-bold w-6 text-center">{qty}</span>
                    <button onClick={() => adjustServings(food.name, 0.5)} className="w-7 h-7 rounded-lg bg-bg-elevated flex items-center justify-center active:scale-90">
                      <Plus size={12} className="text-text-muted" />
                    </button>
                  </div>
                  <button onClick={() => addQuickFood(food)}
                    className="bg-lime text-black font-display font-bold text-[10px] uppercase tracking-wider px-3 py-2 rounded-lg active:scale-95 transition-transform shrink-0">
                    Add
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick add toggle */}
      <div className="px-5 pt-3">
        <button onClick={() => setShowAdd(!showAdd)}
          className={`w-full rounded-2xl p-3.5 text-left transition-all active:scale-[0.98] flex items-center gap-3 ${showAdd ? 'bg-bg-elevated border border-border' : 'bg-gradient-to-r from-lime/10 via-transparent to-transparent border border-lime/20'}`}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${showAdd ? 'bg-bg-card' : 'bg-lime/15'}`}>
            {showAdd ? <ChevronUp size={16} className="text-text-muted" /> : <Plus size={16} className="text-lime" />}
          </div>
          <p className="font-display font-bold text-sm tracking-tight">{showAdd ? 'Hide Quick Add' : 'Browse All Foods'}</p>
        </button>
      </div>

      {/* Full food picker */}
      {showAdd && !showSmartResults && (
        <div className="px-5 pt-3 animate-slide-up space-y-1">
          {(['protein', 'carbs', 'fats', 'other'] as const).map((category) => {
            const foods = filteredFoods.filter((f) => f.category === category)
            if (foods.length === 0) return null
            return (
              <div key={category}>
                <p className="text-text-muted text-[9px] uppercase tracking-[0.2em] font-bold mb-1.5 mt-2">
                  {category === 'fats' ? 'Healthy Fats' : category === 'other' ? 'Meals & Other' : category}
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {foods.map((food) => (
                    <button key={food.name} onClick={() => addQuickFood(food)}
                      className="bg-bg-card border border-border rounded-xl p-3 text-left hover:border-lime/30 transition-all active:scale-[0.97]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{food.emoji}</span>
                        <span className="font-display font-bold text-xs truncate">{food.name}</span>
                      </div>
                      <p className="text-text-muted text-[10px]">{food.serving}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lime text-[10px] font-bold">{food.calories} cal</span>
                        <span className="text-text-muted text-[9px]">{food.protein}P {food.carbs}C {food.fat}F</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Custom entry */}
          <div className="rounded-2xl bg-bg-card border border-border overflow-hidden mt-3">
            <button onClick={() => setShowCustom(!showCustom)} className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                  <Utensils size={14} className="text-cyan-400" />
                </div>
                <span className="font-display font-bold text-sm">Custom Entry</span>
              </div>
              {showCustom ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
            </button>
            {showCustom && (
              <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="Food name"
                  className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder:text-text-muted/40 focus:outline-none focus:border-lime/40" />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-text-muted text-[9px] uppercase tracking-wider block mb-1">Calories</label>
                    <input type="number" value={customCalories} onChange={(e) => setCustomCalories(e.target.value)} placeholder="0"
                      className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text placeholder:text-text-muted/40 focus:outline-none focus:border-lime/40" />
                  </div>
                  <div>
                    <label className="text-cyan-400 text-[9px] uppercase tracking-wider block mb-1">Protein (g)</label>
                    <input type="number" value={customProtein} onChange={(e) => setCustomProtein(e.target.value)} placeholder="0"
                      className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text placeholder:text-text-muted/40 focus:outline-none focus:border-cyan-400/40" />
                  </div>
                  <div>
                    <label className="text-blue-400 text-[9px] uppercase tracking-wider block mb-1">Carbs (g)</label>
                    <input type="number" value={customCarbs} onChange={(e) => setCustomCarbs(e.target.value)} placeholder="0"
                      className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text placeholder:text-text-muted/40 focus:outline-none focus:border-blue-400/40" />
                  </div>
                  <div>
                    <label className="text-lime text-[9px] uppercase tracking-wider block mb-1">Fat (g)</label>
                    <input type="number" value={customFat} onChange={(e) => setCustomFat(e.target.value)} placeholder="0"
                      className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text placeholder:text-text-muted/40 focus:outline-none focus:border-lime/40" />
                  </div>
                </div>
                <button onClick={addCustomFood} disabled={!customName.trim() || !customCalories}
                  className="w-full bg-lime text-black font-display font-bold text-sm uppercase tracking-wider py-2.5 rounded-xl active:scale-[0.98] transition-transform disabled:opacity-30 disabled:active:scale-100">
                  Add Food
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Today's log */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-bold">Today's Log</p>
          <p className="text-text-muted text-[10px]">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</p>
        </div>
        {entries.length === 0 ? (
          <div className="rounded-2xl bg-bg-card border border-border p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-bg-elevated flex items-center justify-center mx-auto mb-3">
              <Utensils size={24} className="text-text-muted" />
            </div>
            <p className="font-display font-bold tracking-tight mb-1">Nothing logged yet</p>
            <p className="text-text-muted text-sm">Log your first meal above</p>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.slice().reverse().map((entry, i) => (
              <div key={entry.id}
                className="animate-slide-up opacity-0 rounded-xl bg-bg-card border border-border p-3.5 flex items-center gap-3"
                style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-display font-bold text-sm truncate">{entry.name}</p>
                    <span className="text-text-muted text-[10px] ml-auto shrink-0">{entry.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="text-lime font-bold">{entry.calories} cal</span>
                    <span className="text-cyan-400">{entry.protein}P</span>
                    <span className="text-blue-400">{entry.carbs}C</span>
                    <span className="text-text-secondary">{entry.fat}F</span>
                  </div>
                </div>
                <button onClick={() => removeEntry(entry.id)}
                  className="w-8 h-8 rounded-lg hover:bg-bg-elevated flex items-center justify-center transition-colors shrink-0">
                  <Trash2 size={14} className="text-text-muted" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
