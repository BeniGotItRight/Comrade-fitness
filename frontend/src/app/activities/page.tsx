'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Dumbbell, Map, Clock } from 'lucide-react'

export default function ActivitiesPage() {
  const activities = [
    { name: 'Walking', icon: Map, color: 'text-blue-500', bg: 'bg-blue-100' },
    { name: 'Gym Workout', icon: Dumbbell, color: 'text-purple-500', bg: 'bg-purple-100' },
    { name: 'Running', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-100' },
    { name: 'Home Workout', icon: Activity, color: 'text-green-500', bg: 'bg-green-100' },
  ]

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Activities</h1>
        <p className="text-zinc-500 text-sm">Track your movements and calories burned.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {activities.map((act) => (
          <motion.div
            key={act.name}
            whileHover={{ scale: 1.02 }}
            className="card flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${act.bg} flex items-center justify-center`}>
                <act.icon className={`w-6 h-6 ${act.color}`} />
              </div>
              <div>
                <h3 className="font-bold">{act.name}</h3>
                <p className="text-xs text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Estimate calories automatically
                </p>
              </div>
            </div>
            <button className="btn-primary py-1.5 px-3 text-xs">Log</button>
          </motion.div>
        ))}
      </div>

      <div className="card bg-zinc-50 dark:bg-zinc-900 border-none p-8 text-center space-y-2">
        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Activity className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="font-bold">No activity logged today</h3>
        <p className="text-sm text-zinc-500 max-w-[200px] mx-auto">
          Every step counts. Start a workout and track your progress here.
        </p>
      </div>
    </div>
  )
}
