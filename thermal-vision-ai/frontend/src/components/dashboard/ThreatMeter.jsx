import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle } from 'lucide-react'

const ThreatMeter = () => {
  const [threatLevel, setThreatLevel] = useState(35)

  const getThreatInfo = (level) => {
    if (level < 25) return { label: 'LOW', color: 'text-cyber-green', bgColor: 'bg-cyber-green', icon: Shield }
    if (level < 50) return { label: 'MODERATE', color: 'text-cyber-yellow', bgColor: 'bg-cyber-yellow', icon: Shield }
    if (level < 75) return { label: 'ELEVATED', color: 'text-orange-500', bgColor: 'bg-orange-500', icon: AlertTriangle }
    return { label: 'CRITICAL', color: 'text-cyber-red', bgColor: 'bg-cyber-red', icon: AlertTriangle }
  }

  const threatInfo = getThreatInfo(threatLevel)

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <threatInfo.icon className={`w-6 h-6 ${threatInfo.color}`} />
        <h3 className="text-lg font-semibold">Threat Level</h3>
      </div>

      {/* Circular Gauge */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#1a2235" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${threatLevel * 2.51} 251`}
            initial={{ strokeDasharray: '0 251' }}
            animate={{ strokeDasharray: `${threatLevel * 2.51} 251` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="50%" stopColor="#ffdd00" />
              <stop offset="100%" stopColor="#ff3860" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${threatInfo.color}`}>{threatLevel}</span>
          <span className={`text-sm font-mono ${threatInfo.color}`}>{threatInfo.label}</span>
        </div>
      </div>

      {/* Threat Score Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Intrusion Score</span>
          <span className="font-mono text-cyber-blue">42%</span>
        </div>
        <div className="w-full h-2 bg-cyber-gray rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyber-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '42%' }}
            transition={{ duration: 1 }}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Motion Activity</span>
          <span className="font-mono text-cyber-yellow">68%</span>
        </div>
        <div className="w-full h-2 bg-cyber-gray rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyber-yellow rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '68%' }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Weapon Detection</span>
          <span className="font-mono text-cyber-green">12%</span>
        </div>
        <div className="w-full h-2 bg-cyber-gray rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyber-green rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '12%' }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </div>
      </div>
    </div>
  )
}

export default ThreatMeter
