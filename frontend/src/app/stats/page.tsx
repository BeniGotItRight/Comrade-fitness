'use client'

import { motion } from 'framer-motion'
import { BarChart2, Calendar, TrendingUp, Droplets, Zap } from 'lucide-react'

export default function StatisticsPage() {
  const stats = [
    { label: 'Weekly Calories', icon: Zap, value: '14,200', unit: 'kcal', color: 'text-orange-500' },
    { label: 'Avg Steps', icon: TrendingUp, value: '8,432', unit: 'steps/day', color: 'text-blue-500' },
    { label: 'Water Goal', icon: Droplets, value: '85%', unit: 'consistency', color: 'text-cyan-500' },
  ]

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-zinc-500 text-sm">Deep dive into your performance.</p>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value} <span className="text-xs font-normal text-zinc-400">{stat.unit}</span></p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Activity Summary */}
      <div className="card space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            Weekly Activity
          </h3>
          <button className="text-xs text-blue-500 font-medium">Export CSV</button>
        </div>
        
        <div className="h-48 w-full bg-zinc-50 dark:bg-zinc-800/50 rounded-xl flex items-end justify-around p-4 gap-2">
           {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
             <motion.div
               key={i}
               initial={{ height: 0 }}
               animate={{ height: `${height}%` }}
               className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600 cursor-pointer relative group"
             >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                   {height*100}
                </div>
             </motion.div>
           ))}
        </div>
        <div className="flex justify-around text-[10px] text-zinc-400 font-bold">
           <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
        </div>
      </div>

      {/* AI Performance Report */}
      <div className="card bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5" />
          Weekly Performance Report
        </h3>
        <p className="text-sm opacity-90 leading-relaxed italic mb-4">
          "Benson, your activity levels are up by 12% compared to last week. However, your protein intake has been slightly lower than usual on gym days. Aim for a bit more Nyama Choma or eggs to maintain muscle recovery!"
        </p>
        <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">
          Download Full Report
        </button>
      </div>
    </div>
  )
}
