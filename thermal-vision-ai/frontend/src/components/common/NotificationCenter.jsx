import React from 'react'
import { motion } from 'framer-motion'
import { X, Bell, Check } from 'lucide-react'

const NotificationCenter = ({ onClose }) => {
  const notifications = [
    { id: 1, type: 'system', message: 'AI model updated to YOLOv8-nano v2.1', time: '5 min ago', read: false },
    { id: 2, type: 'alert', message: 'Camera CAM-004 requires maintenance', time: '12 min ago', read: false },
    { id: 3, type: 'info', message: 'Daily report generated successfully', time: '1 hour ago', read: true },
    { id: 4, type: 'system', message: 'Database backup completed', time: '2 hours ago', read: true },
    { id: 5, type: 'alert', message: 'Edge AI module running at 89% capacity', time: '3 hours ago', read: true },
  ]

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className="h-full bg-cyber-darker/95 backdrop-blur-xl border-l border-cyber-blue/10 flex flex-col"
    >
      <div className="p-4 border-b border-cyber-blue/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-cyber-blue" />
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-cyber-gray/50 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded-lg border transition-colors cursor-pointer ${
              notif.read
                ? 'border-cyber-blue/5 bg-cyber-gray/30'
                : 'border-cyber-blue/20 bg-cyber-blue/5'
            }`}
          >
            <div className="flex items-start gap-3">
              {!notif.read && (
                <div className="w-2 h-2 rounded-full bg-cyber-blue mt-2 animate-pulse" />
              )}
              <div className="flex-1">
                <p className="text-sm">{notif.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{notif.time}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    notif.type === 'alert' ? 'bg-cyber-red/20 text-cyber-red' :
                    notif.type === 'system' ? 'bg-cyber-blue/20 text-cyber-blue' :
                    'bg-cyber-green/20 text-cyber-green'
                  }`}>
                    {notif.type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-cyber-blue/10">
        <button className="w-full py-2 rounded-lg bg-cyber-blue/10 text-cyber-blue text-sm hover:bg-cyber-blue/20 transition-colors flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          Mark all as read
        </button>
      </div>
    </motion.div>
  )
}

export default NotificationCenter
