import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Search, User, Moon } from 'lucide-react'

const Header = ({ onAlertsClick, onNotificationsClick, alertCount }) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-cyber-darker/80 backdrop-blur-xl border-b border-cyber-blue/10 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 ml-12 lg:ml-0">
          <h2 className="text-xl font-semibold text-glow">Command Center</h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-gray/50 border border-cyber-blue/10">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-48"
            />
          </div>

          {/* Notifications */}
          <button
            onClick={onNotificationsClick}
            className="relative p-2 rounded-lg hover:bg-cyber-gray/50 transition-colors"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* Alerts */}
          <button
            onClick={onAlertsClick}
            className="relative p-2 rounded-lg hover:bg-cyber-gray/50 transition-colors"
          >
            <Bell className="w-5 h-5 text-cyber-red" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyber-red rounded-full text-xs flex items-center justify-center font-bold animate-pulse">
                {alertCount}
              </span>
            )}
          </button>

          {/* User */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cyber-gray/50 border border-cyber-blue/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium hidden md:block">Admin</span>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
