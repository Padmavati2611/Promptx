import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const AlertsPanel = ({ onClose }) => {
  const alerts = [
    {
      id: 1,
      type: 'CRITICAL',
      message: 'Unauthorized intrusion detected at Perimeter North',
      time: '2 min ago',
      camera: 'CAM-001',
      confidence: 94,
    },
    {
      id: 2,
      type: 'WARNING',
      message: 'Suspicious movement near Warehouse East entrance',
      time: '8 min ago',
      camera: 'CAM-004',
      confidence: 87,
    },
    {
      id: 3,
      type: 'CRITICAL',
      message: 'Restricted zone breach - Parking Lot sector C',
      time: '15 min ago',
      camera: 'CAM-003',
      confidence: 96,
    },
  ]

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className="h-full bg-cyber-darker/95 backdrop-blur-xl border-l border-cyber-blue/10 flex flex-col"
    >
      <div className="p-4 border-b border-cyber-blue/10 flex items-center justify-between">
        <h3 className="font-semibold text-lg">Active Alerts</h3>
        <button onClick={onClose} className="p-2 hover:bg-cyber-gray/50 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border ${
              alert.type === 'CRITICAL'
                ? 'bg-cyber-red/10 border-cyber-red/30'
                : 'bg-cyber-yellow/10 border-cyber-yellow/30'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                alert.type === 'CRITICAL' ? 'bg-cyber-red text-white' : 'bg-cyber-yellow text-black'
              }`}>
                {alert.type}
              </span>
              <span className="text-xs text-gray-400">{alert.time}</span>
            </div>
            <p className="text-sm mb-2">{alert.message}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{alert.camera}</span>
              <span>Confidence: {alert.confidence}%</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default AlertsPanel
