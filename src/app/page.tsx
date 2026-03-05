'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Flame, Footprints, Droplets, Scale, Zap, PlayCircle, Trophy, Target, ChevronRight } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    calories: 1250,
    goal: 2200,
    steps: 6432,
    water: 5,
    weight: 72.5
  })

  const cards = [
    { title: 'Calories', value: `${stats.calories}`, total: stats.goal, unit: 'kcal', color: 'from-orange-500 to-red-500', icon: Flame },
    { title: 'Steps', value: `${stats.steps}`, total: 10000, unit: 'steps', color: 'from-blue-500 to-cyan-500', icon: Footprints },
    { title: 'Water', value: `${stats.water}`, total: 8, unit: 'glasses', color: 'from-cyan-400 to-blue-400', icon: Droplets },
    { title: 'Weight', value: `${stats.weight}`, unit: 'kg', color: 'from-indigo-500 to-purple-500', icon: Scale }
  ]

  const categories = [
    { name: 'Strength', img: '/images/strength.png', focus: 'Muscle Building' },
    { name: 'Cardio', img: '/images/cardio.png', focus: 'Fat Loss' },
    { name: 'Yoga', img: '/images/yoga.png', focus: 'Flexibility' },
    { name: 'Core', img: '/images/abs.png', focus: '6-Pack Focus' }
  ]

  return (
    <div className="space-y-10 pb-20">
      <header className="flex justify-between items-center px-4 pt-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gradient">Hello, Benson! 🦁</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Ready to crush your goals today?</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg"
        >
          <img src="/images/hero.png" className="w-full h-full object-cover" alt="Profile" />
        </motion.div>
      </header>

      {/* Featured Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-4 h-72 rounded-[3rem] overflow-hidden shadow-2xl group"
      >
        <img 
          src="/images/hero.png" 
          alt="Motivation" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
          <div className="space-y-2">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block">Pro Level</span>
            <h2 className="text-3xl font-black text-white leading-none">THE SIX-PACK<br/>CHALLENGE</h2>
            <p className="text-white/70 text-sm font-medium">Day 12 of 30 • Keep the fire burning</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl text-blue-600"
          >
            <PlayCircle className="w-8 h-8 fill-blue-600/10" />
          </motion.button>
        </div>
      </motion.div>

      {/* Categories Horizontal Scroll */}
      <section className="px-4 space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg tracking-tight">Focus Areas</h3>
            <button className="text-blue-500 text-xs font-bold flex items-center">See All <ChevronRight className="w-3 h-3 ml-1" /></button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.name}
              whileHover={{ y: -5 }}
              className="flex-shrink-0 w-40 space-y-2"
            >
              <div className="h-48 rounded-[2rem] overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
                <img src={cat.img} className="w-full h-full object-cover" alt={cat.name} />
              </div>
              <div className="px-2">
                <p className="font-bold text-sm">{cat.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{cat.focus}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Stats Grid */}
      <section className="px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="card-premium flex flex-col items-center justify-center text-center py-8"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center mb-4 shadow-xl shadow-blue-500/10`}>
              <card.icon className="w-7 h-7" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{card.title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black">{card.value}</span>
              <span className="text-xs font-bold text-slate-400">{card.unit}</span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* AI Coach Immersive Card */}
      <section className="px-4">
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative card-premium overflow-hidden bg-slate-900 border-none min-h-[250px] flex flex-col justify-end"
        >
            <img src="/images/abs.png" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Abs Motivation" />
            <div className="relative p-2 space-y-4">
                <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-blue-500/30">
                    <Zap className="text-blue-400 w-4 h-4" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">AI Coach Insight</span>
                </div>
                <h3 className="text-2xl font-black text-white leading-tight">"Consistency is the secret sauce, Benson."</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                    Your protein intake is perfect for muscle recovery. Let's push for an extra 2,000 steps today to incinerate that final layer of abdominal fat.
                </p>
                <div className="pt-4 flex gap-3">
                    <button className="btn-premium flex-1">Start Workout</button>
                    <button className="glass bg-white/10 text-white flex-1 rounded-2xl font-bold text-sm">Advice</button>
                </div>
            </div>
        </motion.div>
      </section>

      {/* Health Tip / Meal Inspiration */}
      <section className="px-4">
         <div className="card-premium flex gap-4 items-center">
            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                <img src="/images/meal.png" className="w-full h-full object-cover" alt="Meal" />
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Meal Tip</p>
                <h4 className="font-bold text-sm">Post-Workout Recovery</h4>
                <p className="text-xs text-slate-500">Grilled fish and brown rice provide optimal macros for core muscle growth.</p>
            </div>
         </div>
      </section>
    </div>
  )
}
