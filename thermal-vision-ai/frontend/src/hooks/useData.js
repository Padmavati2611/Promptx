import { useState, useEffect, useCallback } from 'react'
import { alertsAPI, analyticsAPI, detectionAPI } from '../api'

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchAlerts = useCallback(async () => {
    try {
      const [alertsRes, statsRes] = await Promise.all([
        alertsAPI.getAll({ limit: 50 }),
        alertsAPI.getStats(),
      ])
      setAlerts(alertsRes.data)
      setStats(statsRes.data)
    } catch (error) {
      console.error('Failed to fetch alerts:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAlerts()
    const interval = setInterval(fetchAlerts, 30000)
    return () => clearInterval(interval)
  }, [fetchAlerts])

  const acknowledgeAlert = async (id) => {
    try {
      await alertsAPI.acknowledge(id)
      await fetchAlerts()
    } catch (error) {
      console.error('Failed to acknowledge alert:', error)
    }
  }

  return { alerts, stats, loading, acknowledgeAlert, refresh: fetchAlerts }
}

export const useAnalytics = () => {
  const [dashboard, setDashboard] = useState(null)
  const [threatScore, setThreatScore] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const [dashRes, threatRes] = await Promise.all([
        analyticsAPI.getDashboard(),
        analyticsAPI.getThreatScore(),
      ])
      setDashboard(dashRes.data)
      setThreatScore(threatRes.data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [fetchData])

  return { dashboard, threatScore, loading, refresh: fetchData }
}

export const useDetections = () => {
  const [detections, setDetections] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDetections = useCallback(async () => {
    try {
      const response = await detectionAPI.getDetections()
      setDetections(response.data)
    } catch (error) {
      console.error('Failed to fetch detections:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDetections()
  }, [fetchDetections])

  return { detections, loading, refresh: fetchDetections }
}
