import React from 'react'
import { motion } from 'framer-motion'
import StatCard from './StatCard'
import LiveFeed from './LiveFeed'
import ThreatMeter from './ThreatMeter'
import RecentAlerts from './RecentAlerts'
import { Shield, Camera, AlertTriangle, Activity, Crosshair, Cpu } from 'lucide-react'

const DashboardMain = () => {
  const stats = [
    {
      title: 'Total Cameras',
      value: '24',
      icon: Camera,
      color: 'blue',
      trend: '+2',
      trendLabel: 'This week',
    },
    {
      title: 'Active Alerts',
      value: '3',
      icon: AlertTriangle,
      color: 'red',
      trend: '-5',
      trendLabel: 'From yesterday',
    },
    {
      title: 'AI Detection Rate',
      value: '98.7%',
      icon: Crosshair,
      color: 'green',
      trend: '+0.3%',
      trendLabel: 'Accuracy',
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      icon: Activity,
      color: 'purple',
      trend: '24/7',
      trendLabel: 'Monitoring',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Feed */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <LiveFeed />
        </motion.div>

        {/* Threat Meter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ThreatMeter />
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <RecentAlerts />
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <SystemStatus />
        </motion.div>
      </div>
    </div>
  )
}

const SystemStatus = () => {
  const systems = [
    { name: 'YOLOv8 Engine', status: 'online', load: '67%' },
    { name: 'OpenCV Pipeline', status: 'online', load: '45%' },
    { name: 'PostgreSQL DB', status: 'online', load: '23%' },
    { name: 'Alert System', status: 'online', load: '12%' },
    { name: 'Edge AI Module', status: 'online', load: '89%' },
    { name: 'Drone Integration', status: 'standby', load: '0%' },
  ]

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <Cpu className="w-6 h-6 text-cyber-blue" />
        <h3 className="text-lg font-semibold">System Status</h3>
      </div>
      <div className="space-y-4">
        {systems.map((system, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-cyber-dark/50">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${system.status === 'online' ? 'bg-cyber-green animate-pulse' : 'bg-cyber-yellow'}`} />
              <span className="text-sm">{system.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 h-2 bg-cyber-gray rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${parseInt(system.load) > 80 ? 'bg-cyber-red' : 'bg-cyber-blue'}`}
                  style={{ width: system.load }}
                />
              </div>
              <span className="text-xs font-mono text-gray-400 w-10">{system.load}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardMain
