import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import { Settings, User, Bell, Shield, Palette, Database, Cpu, Save, Camera } from 'lucide-react'
import toast from 'react-hot-toast'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    notifications: true,
    soundAlerts: true,
    emailAlerts: false,
    autoScreenshot: true,
    detectionThreshold: 75,
    recordingEnabled: true,
    darkMode: true,
    gridOverlay: true,
    heatmaps: true,
  })

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'ai', label: 'AI Engine', icon: Cpu },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'database', label: 'Database', icon: Database },
  ]

  const handleSave = () => {
    toast.success('Settings saved successfully')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-cyber-dark">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Header />
        <div className="p-6 space-y-6">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h2 className="text-2xl font-bold text-glow">Settings</h2>
            <p className="text-gray-400 mt-1">Configure your surveillance system preferences</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Tabs */}
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-cyber-blue/20 text-cyber-blue'
                        : 'text-gray-400 hover:bg-cyber-gray/50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </motion.div>

            {/* Settings Content */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-3 glass-card p-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">General Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-cyber-dark/50">
                      <div>
                        <p className="font-medium">System Name</p>
                        <p className="text-sm text-gray-400">Display name for this surveillance system</p>
                      </div>
                      <input
                        type="text"
                        defaultValue="ThermalVision AI"
                        className="px-3 py-2 rounded bg-cyber-gray border border-cyber-blue/20 outline-none focus:border-cyber-blue"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-cyber-dark/50">
                      <div>
                        <p className="font-medium">Recording Mode</p>
                        <p className="text-sm text-gray-400">Enable continuous recording</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.recordingEnabled}
                        onChange={() => setSettings({ ...settings, recordingEnabled: !settings.recordingEnabled })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-cyber-dark/50">
                      <div>
                        <p className="font-medium">Auto Screenshot</p>
                        <p className="text-sm text-gray-400">Capture screenshots on detection</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.autoScreenshot}
                        onChange={() => setSettings({ ...settings, autoScreenshot: !settings.autoScreenshot })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-cyber-dark/50">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-400">Receive browser notifications for alerts</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.notifications}
                        onChange={() => setSettings({ ...settings, notifications: !settings.notifications })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-cyber-dark/50">
                      <div>
                        <p className="font-medium">Sound Alerts</p>
                        <p className="text-sm text-gray-400">Play sound on threat detection</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.soundAlerts}
                        onChange={() => setSettings({ ...settings, soundAlerts: !settings.soundAlerts })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-cyber-dark/50">
                      <div>
                        <p className="font-medium">Email Alerts</p>
                        <p className="text-sm text-gray-400">Send email notifications for critical alerts</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.emailAlerts}
                        onChange={() => setSettings({ ...settings, emailAlerts: !settings.emailAlerts })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">AI Engine Configuration</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-cyber-dark/50">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">Detection Confidence Threshold</p>
                          <p className="text-sm text-gray-400">Minimum confidence to trigger alert</p>
                        </div>
                        <span className="text-2xl font-bold text-cyber-blue">{settings.detectionThreshold}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="95"
                        value={settings.detectionThreshold}
                        onChange={(e) => setSettings({ ...settings, detectionThreshold: parseInt(e.target.value) })}
                        className="w-full accent-cyber-blue"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>50% (Sensitive)</span>
                        <span>95% (Strict)</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-cyber-dark/50">
                      <p className="font-medium mb-2">Model Information</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-gray-400">Model:</span> <span className="text-cyber-blue">YOLOv8n</span></div>
                        <div><span className="text-gray-400">Version:</span> <span className="text-cyber-blue">2.1.0</span></div>
                        <div><span className="text-gray-400">Classes:</span> <span className="text-cyber-blue">80</span></div>
                        <div><span className="text-gray-400">FPS:</span> <span className="text-cyber-blue">30</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Appearance Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-cyber-dark/50">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-gray-400">Use dark cybersecurity theme</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.darkMode}
                        onChange={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-cyber-dark/50">
                      <div>
                        <p className="font-medium">Grid Overlay</p>
                        <p className="text-sm text-gray-400">Show grid on camera feeds</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.gridOverlay}
                        onChange={() => setSettings({ ...settings, gridOverlay: !settings.gridOverlay })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-cyber-dark/50">
                      <div>
                        <p className="font-medium">Heatmap Visualization</p>
                        <p className="text-sm text-gray-400">Display threat heatmaps on map</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.heatmaps}
                        onChange={() => setSettings({ ...settings, heatmaps: !settings.heatmaps })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'database' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Database Configuration</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-cyber-dark/50">
                      <p className="font-medium mb-4">Connection Status</p>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-cyber-green animate-pulse" />
                        <span className="text-cyber-green font-mono">CONNECTED</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-gray-400">Host:</span> <span className="text-cyber-blue">localhost</span></div>
                        <div><span className="text-gray-400">Port:</span> <span className="text-cyber-blue">5432</span></div>
                        <div><span className="text-gray-400">Database:</span> <span className="text-cyber-blue">thermal_vision</span></div>
                        <div><span className="text-gray-400">Tables:</span> <span className="text-cyber-blue">8</span></div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 rounded-lg bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20 transition-colors">
                        Backup Database
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-cyber-red/10 text-cyber-red hover:bg-cyber-red/20 transition-colors">
                        Clear Logs
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-cyber-dark/50">
                      <p className="font-medium mb-4">Change Password</p>
                      <div className="space-y-3">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full px-3 py-2 rounded bg-cyber-gray border border-cyber-blue/20 outline-none focus:border-cyber-blue"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full px-3 py-2 rounded bg-cyber-gray border border-cyber-blue/20 outline-none focus:border-cyber-blue"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-full px-3 py-2 rounded bg-cyber-gray border border-cyber-blue/20 outline-none focus:border-cyber-blue"
                        />
                        <button className="px-4 py-2 rounded-lg bg-cyber-blue text-black font-medium hover:opacity-90 transition-opacity">
                          Update Password
                        </button>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-cyber-dark/50">
                      <p className="font-medium mb-2">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-400 mb-3">Add an extra layer of security to your account</p>
                      <button className="px-4 py-2 rounded-lg bg-cyber-green/10 text-cyber-green hover:bg-cyber-green/20 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-purple font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

const ToggleSwitch = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-cyber-blue' : 'bg-cyber-gray'}`}
  >
    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'translate-x-7' : 'translate-x-1'}`} />
  </button>
)

export default SettingsPage
