import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { TrendingUp, TrendingDown, Eye, Shield, AlertTriangle, Target } from 'lucide-react'

const AnalyticsPage = () => {
  const intrusionData = [
    { day: 'Mon', count: 12 }, { day: 'Tue', count: 19 },
    { day: 'Wed', count: 8 }, { day: 'Thu', count: 24 },
    { day: 'Fri', count: 15 }, { day: 'Sat', count: 7 },
    { day: 'Sun', count: 4 },
  ]

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    alerts: Math.floor(Math.random() * 15),
  }))

  const accuracyData = [
    { name: 'Week 1', accuracy: 94.2 }, { name: 'Week 2', accuracy: 95.8 },
    { name: 'Week 3', accuracy: 96.1 }, { name: 'Week 4', accuracy: 97.5 },
    { name: 'Week 5', accuracy: 98.2 }, { name: 'Week 6', accuracy: 98.7 },
  ]

  const threatTypes = [
    { name: 'Intrusion', value: 45 }, { name: 'Suspicious', value: 30 },
    { name: 'Motion', value: 15 }, { name: 'Weapon', value: 10 },
  ]

  const COLORS = ['#00d4ff', '#ff3860', '#ffdd00', '#7c3aed']

  const stats = [
    { label: 'Total Detections', value: '1,284', change: '+12%', icon: Eye, color: 'blue' },
    { label: 'False Positives', value: '23', change: '-8%', icon: Shield, color: 'green' },
    { label: 'Critical Alerts', value: '47', change: '+3%', icon: AlertTriangle, color: 'red' },
    { label: 'Avg Confidence', value: '96.2%', change: '+1.4%', icon: Target, color: 'purple' },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-cyber-dark">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Header />
        <div className="p-6 space-y-6">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h2 className="text-2xl font-bold text-glow">Analytics Dashboard</h2>
            <p className="text-gray-400 mt-1">Comprehensive surveillance analytics and insights</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2 text-cyber-blue">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-cyber-blue/50" />
                </div>
                <div className={`mt-4 flex items-center gap-2 ${stat.change.startsWith('+') ? 'text-cyber-green' : 'text-cyber-red'}`}>
                  {stat.change.startsWith('+') ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Daily Intrusion Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={intrusionData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a2235" />
                  <XAxis dataKey="day" stroke="#4a5568" />
                  <YAxis stroke="#4a5568" />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0e1a', border: '1px solid #00d4ff30', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="count" stroke="#00d4ff" fill="url(#colorCount)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Detection Accuracy Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a2235" />
                  <XAxis dataKey="name" stroke="#4a5568" />
                  <YAxis domain={[90, 100]} stroke="#4a5568" />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0e1a', border: '1px solid #00d4ff30', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="accuracy" stroke="#00ff88" strokeWidth={3} dot={{ fill: '#00ff88' }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Alert Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={threatTypes} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {threatTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0a0e1a', border: '1px solid #00d4ff30', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {threatTypes.map((type, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-sm text-gray-400">{type.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="lg:col-span-2 glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Hourly Alert Frequency</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a2235" />
                  <XAxis dataKey="hour" stroke="#4a5568" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#4a5568" />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0e1a', border: '1px solid #00d4ff30', borderRadius: '8px' }} />
                  <Bar dataKey="alerts" fill="#00d4ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AnalyticsPage
