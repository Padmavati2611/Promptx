import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Clock, MapPin } from 'lucide-react'

const RecentAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'Intrusion Detected',
      location: 'Perimeter North - Zone A',
      time: '2 min ago',
      severity: 'critical',
      confidence: 94,
    },
    {
      id: 2,
      type: 'Suspicious Movement',
      location: 'Parking Lot - Zone C',
      time: '8 min ago',
      severity: 'warning',
      confidence: 87,
    },
    {
      id: 3,
      type: 'Restricted Zone Breach',
      location: 'Warehouse East - Zone D',
      time: '15 min ago',
      severity: 'critical',
      confidence: 96,
    },
    {
      id: 4,
      type: 'Motion Detected',
      location: 'Main Gate - Zone B',
      time: '23 min ago',
      severity: 'info',
      confidence: 72,
    },
  ]

  const severityColors = {
    critical: 'text-cyber-red bg-cyber-red/10 border-cyber-red/30',
    warning: 'text-cyber-yellow bg-cyber-yellow/10 border-cyber-yellow/30',
    info: 'text-cyber-blue bg-cyber-blue/10 border-cyber-blue/30',
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-cyber-red" />
          <h3 className="text-lg font-semibold">Recent Alerts</h3>
        </div>
        <span className="text-xs font-mono text-cyber-blue">LIVE UPDATES</span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${severityColors[alert.severity]} cursor-pointer hover:opacity-80 transition-opacity`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-semibold text-sm">{alert.type}</p>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {alert.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.time}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono">{alert.confidence}%</span>
                <p className="text-[10px] text-gray-400">confidence</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default RecentAlerts
