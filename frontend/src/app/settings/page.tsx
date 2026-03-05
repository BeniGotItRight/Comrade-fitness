'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Shield, Moon, Sun, Download, LogOut, ChevronRight } from 'lucide-react'

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)

  const settingsItems = [
    { icon: User, label: 'Edit Profile', value: 'Benson Motari' },
    { icon: Bell, label: 'Notifications', value: 'Enabled' },
    { icon: Shield, label: 'Privacy & Security', value: '' },
    { icon: Download, label: 'Export Data (CSV)', value: '' },
  ]

  return (
    <div className="space-y-6">
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-zinc-500 text-sm">Personalize your experience.</p>
      </header>

      {/* Profile Header */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-3xl shadow-xl">
          🦁
        </div>
        <h2 className="text-xl font-bold">Benson Motari</h2>
        <p className="text-zinc-500 text-xs">Premium Member</p>
      </div>

      <div className="space-y-2">
        {/* Theme Toggle */}
        <div className="card flex items-center justify-between p-4 cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              {darkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            </div>
            <span className="font-medium">Dark Mode</span>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-blue-600' : 'bg-zinc-200'}`}>
            <motion.div
              animate={{ x: darkMode ? 24 : 2 }}
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
            />
          </div>
        </div>

        {settingsItems.map((item) => (
          <div key={item.label} className="card flex items-center justify-between p-4 cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-zinc-500 group-hover:text-blue-500 transition-colors" />
              </div>
              <span className="font-medium">{item.label}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-xs">{item.value}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}

        <div className="card flex items-center gap-3 p-4 cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors mt-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="font-bold">Log Out</span>
        </div>
      </div>

      <p className="text-center text-[10px] text-zinc-400 mt-12 mb-8">
        ComradeFit AI v1.0.0
      </p>
    </div>
  )
}
