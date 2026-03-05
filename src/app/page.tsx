import Link from 'next/link'

export default function Dashboard() {
  const [stats, setStats] = useState({
    calories: 0,
    goal: 2200,
    steps: 0,
    water: 0,
    weight: 0
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const userId = 1 // Benson's ID
        const baseUrl = 'http://localhost:8000'
        
        // Fetch Weight
        const wRes = await fetch(`${baseUrl}/fitness/weight/${userId}`)
        const wData = await wRes.json()
        const currentWeight = wData.length > 0 ? wData[0].weight : 72.5

        // Fetch Water (Simplified for now - would need a dedicated endpoint or daily aggregate)
        // For now using the seed value or default
        
        // Fetch Calories (Today)
        // In a real app, we'd have a summary endpoint. 
        // For this demo, we'll simulate the live fetch from specific logs.
        
        setStats(prev => ({
          ...prev,
          weight: currentWeight,
          calories: 400, // From seed Breakfast
          steps: 6432,   // From seed Activity
          water: 5       // From seed Water
        }))
        
        setIsLoading(false)
      } catch (err) {
        console.error("Fetch error:", err)
        setError("Could not sync with the fitness server. Check if the backend is running!")
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setError(null)
    setTimeout(() => setIsLoading(false), 1000)
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <AlertCircle className="text-red-500 w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="text-slate-500 max-w-xs">{error}</p>
        <button onClick={handleRefresh} className="btn-premium flex items-center gap-2">
          <RefreshCcw className="w-4 h-4" /> Try Again
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Loading Fitness Profile...</p>
      </div>
    )
  }

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gradient">Hello, Benson! 🦁</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-semibold mt-2">Ready to crush your goals today?</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 pr-6 rounded-full shadow-xl border border-blue-500/20"
        >
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500">
            <img src="/images/hero.png" className="w-full h-full object-cover" alt="Profile" />
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-sm">Benson Motari</p>
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Elite Member</p>
          </div>
        </motion.div>
      </header>

      {/* Featured Hero Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl group"
        >
          <img 
            src="/images/hero.png" 
            alt="Motivation" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex justify-between items-end">
            <div className="space-y-4">
              <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest inline-block">Pro Level Challenge</span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-none">THE SIX-PACK<br/>CHALLENGE</h2>
              <p className="text-white/70 text-lg font-medium">Day 12 of 30 • Keep the fire burning, the results are coming.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl text-blue-600"
            >
              <PlayCircle className="w-10 h-10 fill-blue-600/10" />
            </motion.button>
          </div>
        </motion.div>

        {/* AI Coach Immersive Card (Side for Desktop) */}
        <motion.div
            whileHover={{ y: -5 }}
            className="relative card-premium overflow-hidden bg-slate-900 border-none min-h-[400px] flex flex-col justify-end"
        >
            <img src="/images/abs.png" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay rotate-12 scale-150" alt="Abs Motivation" />
            <div className="relative p-8 space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-blue-500/30">
                    <Zap className="text-blue-400 w-5 h-5" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest leading-none">AI Coach Insight</span>
                </div>
                <h3 className="text-3xl font-black text-white leading-tight">"Consistency is the secret sauce, Benson."</h3>
                <p className="text-white/70 text-base leading-relaxed">
                    Your protein intake is perfect for muscle recovery. Let's push for an extra 2,000 steps today to incinerate that final layer of abdominal fat.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <Link href="/activities" className="flex-1">
                      <button className="btn-premium w-full py-4 uppercase tracking-widest font-black">Start Workout</button>
                    </Link>
                    <Link href="/coach" className="flex-1">
                      <button className="glass bg-white/10 text-white w-full rounded-2xl font-bold text-sm tracking-widest uppercase py-4">Get Advice</button>
                    </Link>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Main Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <Link 
            key={card.title}
            href={`/${card.title.toLowerCase() === 'calories' ? 'meals' : card.title.toLowerCase()}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-premium h-full flex flex-col items-center justify-center text-center py-10 cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${card.color} text-white flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/20`}>
                <card.icon className="w-8 h-8" />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{card.title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tight">{card.value}</span>
                <span className="text-sm font-bold text-slate-400">{card.unit}</span>
              </div>
              {card.total && (
                  <div className="mt-6 w-full px-8">
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(parseInt(card.value) / card.total) * 100}%` }}
                              className={`h-full bg-gradient-to-r ${card.color}`} 
                          />
                      </div>
                  </div>
              )}
            </motion.div>
          </Link>
        ))}
      </section>

      {/* Categories Horizontal Scroll */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
            <div>
                <h3 className="font-black text-3xl tracking-tight">Focus Areas</h3>
                <p className="text-slate-500 text-sm font-medium">Select your training intensity for today</p>
            </div>
            <button className="text-blue-500 text-sm font-bold flex items-center hover:translate-x-1 transition-transform">See All Collections <ChevronRight className="w-4 h-4 ml-1" /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.name}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group space-y-4"
            >
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 group-hover:shadow-blue-500/20 transition-all duration-300">
                <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cat.name} />
              </div>
              <div className="px-2">
                <p className="font-black text-xl leading-none">{cat.name}</p>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mt-2">{cat.focus}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Health Tip / Meal Inspiration */}
        <section>
            <motion.div 
                whileHover={{ scale: 1.01 }}
                className="card-premium h-full flex flex-col sm:flex-row gap-8 items-center p-8"
            >
                <div className="w-40 h-40 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-2xl">
                    <img src="/images/meal.png" className="w-full h-full object-cover" alt="Meal" />
                </div>
                <div className="space-y-4 text-center sm:text-left">
                    <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full">
                        Recommended Meal
                    </div>
                    <h4 className="font-black text-2xl leading-none tracking-tight">Post-Workout Recovery Fuel</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        Grilled salmon with quinoa and avocado provides the perfect ratio of protein and healthy fats for core muscle repair.
                    </p>
                    <button className="text-blue-500 font-bold text-sm flex items-center hover:gap-2 transition-all">
                        View Full Recipe <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </motion.div>
        </section>

        {/* Global Progress Chart Integration Placeholder */}
        <section>
            <motion.div 
                whileHover={{ scale: 1.01 }}
                className="card-premium h-full flex flex-col justify-between p-8"
            >
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Weekly Success</p>
                        <h4 className="text-3xl font-black tracking-tight text-gradient">+12.5%</h4>
                    </div>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center">
                        <Target className="text-green-500 w-6 h-6" />
                    </div>
                </div>
                <div className="flex gap-2 items-end h-24 mb-4">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                        <div key={i} className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden relative group">
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                className={`absolute bottom-0 w-full transition-all duration-300 ${i === 3 ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-400'}`}
                            />
                        </div>
                    ))}
                </div>
                <p className="text-xs text-slate-400 font-medium">You are currently in the <strong>Top 5%</strong> of active students this week. Keep going!</p>
            </motion.div>
        </section>
      </div>
    </div>
  )
}
