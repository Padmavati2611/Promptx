import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import { Camera, Radio, Settings, Maximize2, Minimize2, MapPin, Signal, Battery, Wifi, AlertTriangle, Check } from 'lucide-react'

const CameraMonitoringPage = () => {
  const [selectedCamera, setSelectedCamera] = useState(null)
  const [fullscreen, setFullscreen] = useState(false)

  const cameras = [
    { id: 1, name: 'Perimeter North', zone: 'Zone A', status: 'online', signal: 95, battery: 100, fps: 30, resolution: '1920x1080', detections: 2, lastAlert: '2 min ago' },
    { id: 2, name: 'Main Gate', zone: 'Zone B', status: 'online', signal: 88, battery: 100, fps: 30, resolution: '1920x1080', detections: 0, lastAlert: '1 hour ago' },
    { id: 3, name: 'Parking Lot', zone: 'Zone C', status: 'online', signal: 72, battery: 85, fps: 24, resolution: '1280x720', detections: 1, lastAlert: '8 min ago' },
    { id: 4, name: 'Warehouse East', zone: 'Zone D', status: 'warning', signal: 45, battery: 42, fps: 15, resolution: '1280x720', detections: 3, lastAlert: 'Just now' },
    { id: 5, name: 'South Fence', zone: 'Zone E', status: 'online', signal: 91, battery: 100, fps: 30, resolution: '1920x1080', detections: 0, lastAlert: '3 hours ago' },
    { id: 6, name: 'Building A', zone: 'Zone F', status: 'online', signal: 87, battery: 100, fps: 30, resolution: '1920x1080', detections: 0, lastAlert: '5 hours ago' },
  ]

  const statusColors = {
    online: 'bg-cyber-green/20 text-cyber-green border-cyber-green/30',
    warning: 'bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30',
    offline: 'bg-cyber-red/20 text-cyber-red border-cyber-red/30',
  }

  return (
    <div className="flex h-screen overflow-hidden bg-cyber-dark">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Header />
        <div className="p-6 space-y-6">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-glow">Camera Monitoring</h2>
                <p className="text-gray-400 mt-1">Real-time surveillance camera management</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-cyber-green font-mono">{cameras.filter(c => c.status === 'online').length}/{cameras.length} ONLINE</span>
              </div>
            </div>
          </motion.div>

          {/* Camera Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cameras.map((camera, index) => (
              <motion.div
                key={camera.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCamera(selectedCamera === camera.id ? null : camera.id)}
                className={`glass-card overflow-hidden cursor-pointer transition-all ${
                  selectedCamera === camera.id ? 'ring-2 ring-cyber-blue shadow-neon-blue' : ''
                }`}
              >
                {/* Camera Feed Simulation */}
                <div className="relative aspect-video bg-gradient-to-br from-purple-900 via-red-900 to-yellow-600">
                  {/* Detection Boxes */}
                  {camera.detections > 0 && (
                    <>
                      <div className="absolute top-[25%] left-[35%] w-[30%] h-[45%] border-2 border-cyber-red animate-pulse">
                        <span className="absolute -top-5 left-0 bg-cyber-red px-1.5 py-0.5 rounded text-[10px] font-mono">
                          HUMAN {camera.detections * 31}%
                        </span>
                      </div>
                      {camera.detections > 1 && (
                        <div className="absolute top-[45%] right-[25%] w-[25%] h-[40%] border-2 border-cyber-yellow">
                          <span className="absolute -top-5 left-0 bg-cyber-yellow text-black px-1.5 py-0.5 rounded text-[10px] font-mono">
                            HUMAN 87%
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  {/* Grid Overlay */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }} />

                  {/* Scan Line */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent animate-pulse" />

                  {/* Corner Markers */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-blue" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyber-blue" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyber-blue" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyber-blue" />

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold border ${statusColors[camera.status]}`}>
                      {camera.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Camera Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="font-semibold text-sm">{camera.name}</p>
                    <p className="text-[10px] text-gray-400">{camera.zone} | CAM-{String(camera.id).padStart(3, '0')}</p>
                  </div>
                </div>

                {/* Camera Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Signal className="w-4 h-4" /> Signal
                    </span>
                    <span className={`font-mono ${camera.signal > 70 ? 'text-cyber-green' : camera.signal > 40 ? 'text-cyber-yellow' : 'text-cyber-red'}`}>
                      {camera.signal}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Battery className="w-4 h-4" /> Battery
                    </span>
                    <span className={`font-mono ${camera.battery > 50 ? 'text-cyber-green' : 'text-cyber-red'}`}>
                      {camera.battery}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Resolution</span>
                    <span className="font-mono text-cyber-blue">{camera.resolution}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">FPS</span>
                    <span className="font-mono">{camera.fps}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Last Alert</span>
                    <span className="font-mono text-cyber-yellow">{camera.lastAlert}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default CameraMonitoringPage
