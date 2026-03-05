'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, TrendingDown, Target, HelpCircle } from 'lucide-react'

export default function WeightPage() {
  const [weight, setWeight] = useState(72.5)
  const [height, setHeight] = useState(175) // in cm

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1)
  const getBMICategory = (val: number) => {
    if (val < 18.5) return 'Underweight'
    if (val < 25) return 'Normal'
    if (val < 30) return 'Overweight'
    return 'Obese'
  }

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Weight Tracker</h1>
        <p className="text-zinc-500 text-sm">Monitor your progress towards your goals.</p>
      </header>

      {/* Weight Entry Card */}
      <div className="card space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Scale className="w-5 h-5 text-blue-600" />
             </div>
             <div>
                <p className="text-sm font-medium text-zinc-500">Current Weight</p>
                <p className="text-2xl font-bold">{weight} kg</p>
             </div>
          </div>
          <button className="btn-primary">Update</button>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
           <div>
              <p className="text-xs text-zinc-400 uppercase font-bold tracking-tight">BMI Score</p>
              <p className="text-xl font-bold">{bmi}</p>
              <p className="text-xs text-blue-500 font-medium">{getBMICategory(parseFloat(bmi))}</p>
           </div>
           <div>
              <p className="text-xs text-zinc-400 uppercase font-bold tracking-tight">Fat Loss</p>
              <p className="text-xl font-bold">-2.4 kg</p>
              <p className="text-xs text-zinc-500 font-medium italic">this month</p>
           </div>
        </div>
      </div>

      {/* Goal Progress */}
      <div className="card bg-blue-600 text-white border-none relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80">Goal Progress</h3>
          <div className="flex justify-between items-end mb-2">
            <span className="text-3xl font-bold">68.0 kg</span>
            <span className="text-xs opacity-70 mb-1">Target Weight</span>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              className="bg-white h-full"
            />
          </div>
          <p className="mt-3 text-xs opacity-80 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> 4.5 kg more to go!
          </p>
        </div>
        <HelpCircle className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5" />
      </div>

      {/* Chart Placeholder */}
      <div className="card h-64 flex flex-col items-center justify-center text-zinc-400">
        <div className="w-full h-full bg-zinc-50 dark:bg-zinc-800/50 rounded-xl flex items-center justify-center relative overflow-hidden">
           {/* Visual Graph Representation */}
           <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,80 Q25,85 50,60 T100,20" fill="none" stroke="currentColor" strokeWidth="2" />
           </svg>
           <p className="text-sm font-medium z-10">Monthly Weight Trend Chart</p>
        </div>
      </div>
    </div>
  )
}
