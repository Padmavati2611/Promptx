import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2, Minimize2, Radio, Settings, MoreHorizontal } from 'lucide-react'

const LiveFeed = () => {
  const [fullscreen, setFullscreen] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState(0)

  const cameras = [
    { id: 1, name: 'Perimeter North', status: 'online', detections: 2, zone: 'Zone A' },
    { id: 2, name: 'Main Gate', status: 'online', detections: 0, zone: 'Zone B' },
    { id: 3, name: 'Parking Lot', status: 'online', detections: 1, zone: 'Zone C' },
    { id: 4, name: 'Warehouse East', status: 'warning', detections: 3, zone: 'Zone D' },
  ]

  return (
    <div className={`glass-card p-6 ${fullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Radio className="w-5 h-5 text-cyber-green animate-pulse" />
          <h3 className="text-lg font-semibold">Live Thermal Feed</h3>
          <span className="px-2 py-1 rounded bg-cyber-green/20 text-cyber-green text-xs font-mono">
            LIVE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-cyber-gray/50 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="p-2 rounded hover:bg-cyber-gray/50 transition-colors"
          >
            {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Camera Grid */}
      <div className={`grid gap-4 ${selectedCamera === -1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {cameras.map((camera, index) => (
          <motion.div
            key={camera.id}
            whileHover={{ scale: selectedCamera === -1 ? 1.02 : 1 }}
            onClick={() => setSelectedCamera(selectedCamera === index ? -1 : index)}
            className={`relative rounded-lg overflow-hidden cursor-pointer ${
              selectedCamera === index || selectedCamera === -1 ? 'block' : selectedCamera === -1 ? 'block' : 'block'
            }`}
          >
            {/* Thermal Simulation */}
            <div className="relative aspect-video bg-gradient-to-br from-purple-900 via-red-900 to-yellow-600">
              {/* Detection Boxes */}
              {camera.detections > 0 && (
                <>
                  <div className="absolute top-[20%] left-[30%] w-[25%] h-[40%] border-2 border-cyber-red animate-pulse">
                    <span className="absolute -top-6 left-0 bg-cyber-red px-2 py-0.5 rounded text-xs font-mono">
                      HUMAN 94%
                    </span>
                  </div>
                  {camera.detections > 1 && (
                    <div className="absolute top-[40%] right-[20%] w-[20%] h-[35%] border-2 border-cyber-yellow">
                      <span className="absolute -top-6 left-0 bg-cyber-yellow text-black px-2 py-0.5 rounded text-xs font-mono">
                        HUMAN 87%
                      </span>
                    </div>
                  )}
                </>
              )}

              {/* Scan Line Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent animate-pulse" />

              {/* Grid Overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />

              {/* Camera Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{camera.name}</p>
                    <p className="text-xs text-gray-400">{camera.zone} | CAM-{String(camera.id).padStart(3, '0')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${camera.status === 'online' ? 'bg-cyber-green' : 'bg-cyber-yellow'} animate-pulse`} />
                    <span className="text-xs font-mono">{camera.status.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Corner Markers */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-blue" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyber-blue" />
              <div className="absolute bottom-12 left-2 w-4 h-4 border-b-2 border-l-2 border-cyber-blue" />
              <div className="absolute bottom-12 right-2 w-4 h-4 border-b-2 border-r-2 border-cyber-blue" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LiveFeed
