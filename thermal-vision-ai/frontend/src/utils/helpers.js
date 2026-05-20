export const generateMockDetections = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `DET-${String(i + 1).padStart(3, '0')}`,
    camera: `CAM-${String(Math.floor(Math.random() * 6) + 1).padStart(3, '0')}`,
    type: Math.random() > 0.7 ? 'weapon' : 'person',
    confidence: Math.floor(Math.random() * 30) + 70,
    time: `${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    zone: `Zone ${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`,
  }))
}

export const generateMockAlerts = () => {
  const types = ['Intrusion', 'Suspicious Movement', 'Restricted Zone', 'Motion', 'Weapon']
  const severities = ['critical', 'warning', 'info']
  const locations = [
    'Perimeter North', 'Main Gate', 'Parking Lot', 'Warehouse East', 'South Fence', 'Building A'
  ]

  return Array.from({ length: 50 }, (_, i) => ({
    id: `ALT-${String(i + 1).padStart(3, '0')}`,
    type: types[Math.floor(Math.random() * types.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    confidence: Math.floor(Math.random() * 30) + 70,
    status: Math.random() > 0.5 ? 'active' : Math.random() > 0.5 ? 'acknowledged' : 'resolved',
    time: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  }))
}

export const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const getSeverityColor = (severity) => {
  const colors = {
    critical: 'text-cyber-red',
    warning: 'text-cyber-yellow',
    info: 'text-cyber-blue',
  }
  return colors[severity] || 'text-gray-400'
}

export const getThreatLevel = (score) => {
  if (score < 25) return { label: 'LOW', color: 'text-cyber-green' }
  if (score < 50) return { label: 'MODERATE', color: 'text-cyber-yellow' }
  if (score < 75) return { label: 'ELEVATED', color: 'text-orange-500' }
  return { label: 'CRITICAL', color: 'text-cyber-red' }
}
