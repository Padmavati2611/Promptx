import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard,
  BarChart3,
  Bell,
  Camera,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  Crosshair,
  Map,
  AlertTriangle,
  Cpu,
} from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAdmin } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', adminOnly: false },
    { path: '/cameras', icon: Camera, label: 'Cameras', adminOnly: false },
    { path: '/alerts', icon: Bell, label: 'Alerts', adminOnly: false },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', adminOnly: false },
    { path: '/settings', icon: Settings, label: 'Settings', adminOnly: false },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const sidebarContent = (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="h-full flex flex-col bg-cyber-darker/90 backdrop-blur-xl border-r border-cyber-blue/10"
    >
      {/* Logo */}
      <div className="p-6 border-b border-cyber-blue/10">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center shadow-neon-blue"
          >
            <Crosshair className="w-6 h-6 text-white" />
          </motion.div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-xl font-bold text-glow">ThermalVision</h1>
              <p className="text-xs text-cyber-blue/60 font-mono">AI SURVEILLANCE</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="px-4 py-4 border-b border-cyber-blue/10">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-cyber-gray/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-green flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-xs text-cyber-green font-mono">{user?.role?.toUpperCase()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          if (item.adminOnly && !isAdmin) return null
          const isActive = location.pathname === item.path
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-cyber-blue/20 text-cyber-blue shadow-neon-blue'
                    : 'text-gray-400 hover:text-white hover:bg-cyber-gray/50'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* System Status */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-cyber-blue/10">
          <div className="p-4 rounded-lg bg-cyber-gray/50 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> AI Engine
              </span>
              <span className="text-cyber-green font-mono text-xs">ONLINE</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Threats
              </span>
              <span className="text-cyber-red font-mono text-xs">3 ACTIVE</span>
            </div>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="p-4 border-t border-cyber-blue/10">
        <motion.button
          whileHover={{ x: 4 }}
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:text-cyber-red hover:bg-cyber-red/10 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </motion.button>
      </div>
    </motion.div>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-cyber-gray border border-cyber-blue/20"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full z-50 w-72 transition-transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 w-[280px]">
        {sidebarContent}
      </aside>
    </>
  )
}

export default Sidebar
