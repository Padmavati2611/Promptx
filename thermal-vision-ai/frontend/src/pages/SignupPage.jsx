import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Crosshair, Eye, EyeOff, Mail, Lock, User, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

const SignupPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('officer')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await signup(name, email, password, role)
      toast.success('Account created successfully')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-full max-w-md p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center shadow-neon-blue mb-4"
          >
            <Crosshair className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-glow">ThermalVision</h1>
          <p className="text-cyber-blue/60 font-mono text-sm mt-1">CREATE ACCOUNT</p>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-xl font-semibold mb-6">Register New User</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-cyber-dark border border-cyber-blue/20 focus:border-cyber-blue focus:outline-none transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-cyber-dark border border-cyber-blue/20 focus:border-cyber-blue focus:outline-none transition-colors"
                  placeholder="user@thermal.ai"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-cyber-dark border border-cyber-blue/20 focus:border-cyber-blue focus:outline-none transition-colors"
                  placeholder="Min 8 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-cyber-dark border border-cyber-blue/20 focus:border-cyber-blue focus:outline-none transition-colors"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('officer')}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    role === 'officer'
                      ? 'border-cyber-blue bg-cyber-blue/10 text-cyber-blue'
                      : 'border-cyber-blue/20 hover:border-cyber-blue/40'
                  }`}
                >
                  <Shield className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm">Officer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    role === 'admin'
                      ? 'border-cyber-blue bg-cyber-blue/10 text-cyber-blue'
                      : 'border-cyber-blue/20 hover:border-cyber-blue/40'
                  }`}
                >
                  <Shield className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm">Admin</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-purple font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-cyber-blue hover:underline">Login Here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default SignupPage
