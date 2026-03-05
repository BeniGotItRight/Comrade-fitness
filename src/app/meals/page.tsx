'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Utensils } from 'lucide-react'

const KENYAN_FOODS = [
  { name: 'Ugali', calories: 110, protein: 2.6, carbs: 24, fats: 0.4 },
  { name: 'Sukuma Wiki', calories: 49, protein: 3.3, carbs: 9, fats: 0.9 },
  { name: 'Nyama Choma', calories: 250, protein: 25, carbs: 0, fats: 15 },
  { name: 'Chapati', calories: 297, protein: 8, carbs: 46, fats: 10 },
  { name: 'Githeri', calories: 150, protein: 6, carbs: 28, fats: 2 },
  { name: 'Pilau', calories: 180, protein: 5, carbs: 35, fats: 4 },
  { name: 'Mandazi', calories: 350, protein: 6, carbs: 50, fats: 15 },
]

export default function MealsPage() {
  const [search, setSearch] = useState('')
  const [loggedMeals, setLoggedMeals] = useState([
    { name: 'Breakfast', items: [{ name: 'Tea & Mandazi', calories: 400 }] }
  ])

  const filteredFoods = KENYAN_FOODS.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Meal Tracker</h1>
        <p className="text-zinc-500 text-sm">Fuel your body efficiently.</p>
      </header>

      {/* Food Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search Kenyan foods (Ugali, Chapati...)"
          className="input-field pl-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {search && (
        <div className="card space-y-2 p-2">
          {filteredFoods.map(food => (
            <div key={food.name} className="flex justify-between items-center p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
              <div>
                <p className="font-medium">{food.name}</p>
                <p className="text-xs text-zinc-500">{food.calories} kcal | P: {food.protein}g C: {food.carbs}g F: {food.fats}g</p>
              </div>
              <Plus className="text-blue-500 w-5 h-5" />
            </div>
          ))}
        </div>
      )}

      {/* Logged Meals */}
      <div className="space-y-4">
        {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((mealType) => (
          <div key={mealType} className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold flex items-center gap-2">
                <Utensils className="w-4 h-4 text-blue-500" />
                {mealType}
              </h3>
              <span className="text-sm font-medium text-zinc-400">0 kcal</span>
            </div>
            <button className="w-full py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-400 text-sm hover:border-blue-500 hover:text-blue-500 transition-all">
              + Add {mealType}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
