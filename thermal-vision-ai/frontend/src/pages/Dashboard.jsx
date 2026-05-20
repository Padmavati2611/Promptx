import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './components/common/Sidebar'
import Header from './components/common/Header'
import DashboardMain from './components/dashboard/DashboardMain'
import AlertsPanel from './components/alerts/AlertsPanel'
import NotificationCenter from './components/common/NotificationCenter'

const Dashboard = () => {
  const [showAlerts, setShowAlerts] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [alertCount, setAlertCount] = useState(3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  return (
    <div className="flex h-screen overflow-hidden bg-cyber-dark">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Header
          onAlertsClick={() => setShowAlerts(!showAlerts)}
          onNotificationsClick={() => setShowNotifications(!showNotifications)}
          alertCount={alertCount}
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 space-y-6"
        >
          <DashboardMain />
        </motion.div>
      </main>

      {/* Alerts Panel */}
      {showAlerts && (
        <div className="fixed right-0 top-16 bottom-0 w-96 z-50">
          <AlertsPanel onClose={() => setShowAlerts(false)} />
        </div>
      )}

      {/* Notification Center */}
      {showNotifications && (
        <div className="fixed right-0 top-16 bottom-0 w-96 z-50">
          <NotificationCenter onClose={() => setShowNotifications(false)} />
        </div>
      )}
    </div>
  )
}

export default Dashboard
