import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import { Search, Filter, AlertTriangle, Clock, MapPin, Camera, Download, Eye } from 'lucide-react'

const AlertHistoryPage = () => {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const alerts = [
    { id: 'ALT-001', type: 'Intrusion', severity: 'critical', location: 'Perimeter North - Zone A', time: '2024-01-15 14:32:45', camera: 'CAM-001', confidence: 94, status: 'active', screenshot: true },
    { id: 'ALT-002', type: 'Suspicious Movement', severity: 'warning', location: 'Parking Lot - Zone C', time: '2024-01-15 13:18:22', camera: 'CAM-003', confidence: 87, status: 'acknowledged', screenshot: true },
    { id: 'ALT-003', type: 'Restricted Zone', severity: 'critical', location: 'Warehouse East - Zone D', time: '2024-01-15 12:05:11', camera: 'CAM-004', confidence: 96, status: 'active', screenshot: true },
    { id: 'ALT-004', type: 'Motion Detected', severity: 'info', location: 'Main Gate - Zone B', time: '2024-01-15 10:42:33', camera: 'CAM-002', confidence: 72, status: 'resolved', screenshot: false },
    { id: 'ALT-005', type: 'Intrusion', severity: 'critical', location: 'South Fence - Zone E', time: '2024-01-15 08:15:09', camera: 'CAM-005', confidence: 91, status: 'resolved', screenshot: true },
    { id: 'ALT-006', type: 'Weapon Detected', severity: 'critical', location: 'Building A Entrance', time: '2024-01-14 22:33:47', camera: 'CAM-006', confidence: 88, status: 'resolved', screenshot: true },
  ]

  const severityColors = {
    critical: 'bg-cyber-red/20 text-cyber-red border-cyber-red/30',
    warning: 'bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30',
    info: 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30',
  }

  const statusColors = {
    active: 'bg-cyber-red/20 text-cyber-red',
    acknowledged: 'bg-cyber-yellow/20 text-cyber-yellow',
    resolved: 'bg-cyber-green/20 text-cyber-green',
  }

  return (
    <div className="flex h-screen overflow-hidden bg-cyber-dark">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Header />
        <div className="p-6 space-y-6">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h2 className="text-2xl font-bold text-glow">Alert History</h2>
            <p className="text-gray-400 mt-1">Complete log of all security alerts and detections</p>
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-cyber-dark border border-cyber-blue/20 rounded-lg px-3 py-2 text-sm outline-none"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>
              </div>
              <button className="px-4 py-2 rounded-lg bg-cyber-blue/10 text-cyber-blue text-sm hover:bg-cyber-blue/20 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </motion.div>

          {/* Alerts Table */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyber-blue/10">
                    <th className="text-left p-4 text-gray-400 font-medium text-sm">Alert ID</th>
                    <th className="text-left p-4 text-gray-400 font-medium text-sm">Type</th>
                    <th className="text-left p-4 text-gray-400 font-medium text-sm">Severity</th>
                    <th className="text-left p-4 text-gray-400 font-medium text-sm">Location</th>
                    <th className="text-left p-4 text-gray-400 font-medium text-sm">Time</th>
                    <th className="text-left p-4 text-gray-400 font-medium text-sm">Camera</th>
                    <th className="text-left p-4 text-gray-400 font-medium text-sm">Confidence</th>
                    <th className="text-left p-4 text-gray-400 font-medium text-sm">Status</th>
                    <th className="text-left p-4 text-gray-400 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert, index) => (
                    <motion.tr
                      key={alert.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-cyber-blue/5 hover:bg-cyber-blue/5 transition-colors"
                    >
                      <td className="p-4 font-mono text-sm">{alert.id}</td>
                      <td className="p-4 text-sm">{alert.type}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs border ${severityColors[alert.severity]}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-sm flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        {alert.location}
                      </td>
                      <td className="p-4 text-sm font-mono text-gray-400">{alert.time}</td>
                      <td className="p-4 text-sm flex items-center gap-2">
                        <Camera className="w-3 h-3 text-gray-500" />
                        {alert.camera}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-cyber-gray rounded-full overflow-hidden">
                            <div className="h-full bg-cyber-blue rounded-full" style={{ width: `${alert.confidence}%` }} />
                          </div>
                          <span className="text-xs font-mono">{alert.confidence}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs ${statusColors[alert.status]}`}>
                          {alert.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded hover:bg-cyber-gray/50 transition-colors">
                            <Eye className="w-4 h-4 text-cyber-blue" />
                          </button>
                          {alert.screenshot && (
                            <button className="p-1.5 rounded hover:bg-cyber-gray/50 transition-colors">
                              <Download className="w-4 h-4 text-cyber-green" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default AlertHistoryPage
