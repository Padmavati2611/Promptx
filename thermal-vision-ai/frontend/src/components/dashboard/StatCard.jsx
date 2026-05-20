import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

const StatCard = ({ title, value, icon: Icon, color, trend, trendLabel }) => {
  const colorMap = {
    blue: { bg: 'bg-cyber-blue/10', text: 'text-cyber-blue', glow: 'shadow-neon-blue' },
    red: { bg: 'bg-cyber-red/10', text: 'text-cyber-red', glow: 'shadow-neon-red' },
    green: { bg: 'bg-cyber-green/10', text: 'text-cyber-green', glow: 'shadow-neon-green' },
    purple: { bg: 'bg-cyber-purple/10', text: 'text-cyber-purple', glow: '' },
  }

  const colors = colorMap[color]

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-card p-6 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${colors.text} text-glow`}>{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {trend.startsWith('+') ? (
          <TrendingUp className="w-4 h-4 text-cyber-green" />
        ) : (
          <TrendingDown className="w-4 h-4 text-cyber-red" />
        )}
        <span className={`text-sm font-medium ${trend.startsWith('-') ? 'text-cyber-green' : 'text-cyber-blue'}`}>
          {trend}
        </span>
        <span className="text-gray-500 text-xs">{trendLabel}</span>
      </div>
    </motion.div>
  )
}

export default StatCard
