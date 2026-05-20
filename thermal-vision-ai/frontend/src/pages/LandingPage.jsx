import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Crosshair, Shield, Camera, Brain, Zap, Globe,
  ArrowRight, Check, Star, Activity, Cpu, Map,
  Bell, Eye, Lock, Radio, ChevronRight
} from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'YOLOv8 AI Detection',
      description: 'State-of-the-art deep learning model for real-time human detection in thermal imagery with 98.7% accuracy.',
      color: 'blue',
    },
    {
      icon: Camera,
      title: 'Multi-Camera Support',
      description: 'Simultaneous monitoring of multiple thermal cameras with live streaming and instant alert generation.',
      color: 'green',
    },
    {
      icon: Shield,
      title: 'Intrusion Detection',
      description: 'Advanced zone-based intrusion detection with configurable restricted areas and instant threat alerts.',
      color: 'red',
    },
    {
      icon: Activity,
      title: 'Real-Time Analytics',
      description: 'Comprehensive dashboard with live statistics, threat heatmaps, and predictive analytics.',
      color: 'purple',
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Multi-channel alert system with severity classification, confidence scoring, and notification management.',
      color: 'yellow',
    },
    {
      icon: Map,
      title: 'Location Tracking',
      description: 'Interactive map integration with live incident markers, route tracking, and security zone mapping.',
      color: 'blue',
    },
  ]

  const stats = [
    { value: '98.7%', label: 'Detection Accuracy' },
    { value: '<50ms', label: 'Response Time' },
    { value: '24/7', label: 'Monitoring' },
    { value: '100+', label: 'Cameras Supported' },
  ]

  const technologies = [
    'YOLOv8', 'OpenCV', 'FastAPI', 'React', 'PostgreSQL', 'Docker', 'AWS', 'TensorFlow'
  ]

  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-darker/80 backdrop-blur-xl border-b border-cyber-blue/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center shadow-neon-blue"
            >
              <Crosshair className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-glow">ThermalVision</h1>
              <p className="text-[10px] text-cyber-blue/60 font-mono">AI SURVEILLANCE</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#technology" className="text-gray-400 hover:text-white transition-colors">Technology</a>
            <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
            <Link to="/login" className="px-4 py-2 rounded-lg bg-cyber-gray/50 border border-cyber-blue/20 hover:border-cyber-blue transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-purple font-medium hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyber-blue/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyber-purple/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,212,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 mb-8">
              <Radio className="w-4 h-4 text-cyber-green animate-pulse" />
              <span className="text-sm text-cyber-blue">AI-Powered Surveillance Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              <span className="text-glow">Next-Gen</span>
              <br />
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-red bg-clip-text text-transparent">
                Thermal AI
              </span>
              <br />
              <span className="text-glow">Surveillance</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Advanced thermal imaging powered by YOLOv8 deep learning. Detect, track, and respond to threats in real-time with industry-leading accuracy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-purple font-semibold text-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-neon-blue"
              >
                Launch Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="px-8 py-4 rounded-lg border border-cyber-blue/30 font-semibold text-lg hover:bg-cyber-blue/10 transition-colors flex items-center gap-2"
              >
                Explore Features
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Hero Image/Visualization */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 relative"
          >
            <div className="glass-card p-4 max-w-4xl mx-auto">
              <div className="relative aspect-video bg-gradient-to-br from-purple-900 via-red-900 to-yellow-600 rounded-lg overflow-hidden">
                {/* Detection Boxes */}
                <div className="absolute top-[15%] left-[20%] w-[20%] h-[50%] border-2 border-cyber-red animate-pulse">
                  <span className="absolute -top-6 left-0 bg-cyber-red px-2 py-1 rounded text-xs font-mono">HUMAN 96.4%</span>
                </div>
                <div className="absolute top-[30%] right-[25%] w-[18%] h-[45%] border-2 border-cyber-yellow">
                  <span className="absolute -top-6 left-0 bg-cyber-yellow text-black px-2 py-1 rounded text-xs font-mono">HUMAN 91.2%</span>
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }} />

                {/* UI Elements */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyber-green animate-pulse" />
                  <span className="text-xs font-mono">LIVE | CAM-001</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="px-3 py-1 rounded bg-cyber-red/80 text-xs font-bold">ALERT: INTRUSION DETECTED</div>
                  <div className="px-3 py-1 rounded bg-cyber-dark/80 text-xs font-mono">FPS: 30 | CONF: 96.4%</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-cyber-blue/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-glow mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-glow mb-4">Advanced Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powered by cutting-edge AI and computer vision technology for unparalleled surveillance capabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-8 cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  feature.color === 'blue' ? 'bg-cyber-blue/20' :
                  feature.color === 'green' ? 'bg-cyber-green/20' :
                  feature.color === 'red' ? 'bg-cyber-red/20' :
                  feature.color === 'purple' ? 'bg-cyber-purple/20' :
                  'bg-cyber-yellow/20'
                }`}>
                  <feature.icon className={`w-7 h-7 ${
                    feature.color === 'blue' ? 'text-cyber-blue' :
                    feature.color === 'green' ? 'text-cyber-green' :
                    feature.color === 'red' ? 'text-cyber-red' :
                    feature.color === 'purple' ? 'text-cyber-purple' :
                    'text-cyber-yellow'
                  }`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-24 bg-cyber-darker/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-glow mb-4">Technology Stack</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built with industry-leading technologies for maximum performance and reliability.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -4 }}
                className="px-6 py-3 rounded-lg bg-cyber-gray/50 border border-cyber-blue/20 font-mono text-sm hover:border-cyber-blue transition-colors cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-glow mb-6">Why ThermalVision AI?</h2>
              <p className="text-gray-400 mb-8">
                Our platform combines cutting-edge thermal imaging technology with advanced AI algorithms to provide unmatched surveillance capabilities. Designed for security professionals, our system delivers real-time threat detection with industry-leading accuracy.
              </p>
              <div className="space-y-4">
                {[
                  'Real-time human detection in complete darkness',
                  '98.7% accuracy with YOLOv8 deep learning',
                  'Multi-camera support with live streaming',
                  'Instant alerts with threat severity classification',
                  'Cloud-ready deployment with Docker & AWS',
                  'Edge AI optimization for low-latency processing',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-cyber-green flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-cyber-dark/50">
                  <Cpu className="w-8 h-8 text-cyber-blue" />
                  <div>
                    <p className="font-semibold">Edge AI Processing</p>
                    <p className="text-sm text-gray-400">Optimized for real-time inference on edge devices</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-cyber-dark/50">
                  <Eye className="w-8 h-8 text-cyber-purple" />
                  <div>
                    <p className="font-semibold">Thermal Image Processing</p>
                    <p className="text-sm text-gray-400">Advanced OpenCV pipeline for IR imagery</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-cyber-dark/50">
                  <Lock className="w-8 h-8 text-cyber-green" />
                  <div>
                    <p className="font-semibold">Secure Architecture</p>
                    <p className="text-sm text-gray-400">Role-based access with encrypted communications</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-cyber-dark/50">
                  <Globe className="w-8 h-8 text-cyber-red" />
                  <div>
                    <p className="font-semibold">Scalable Deployment</p>
                    <p className="text-sm text-gray-400">Docker containers ready for AWS EC2</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-glow mb-6">Ready to Deploy?</h2>
            <p className="text-xl text-gray-400 mb-10">
              Get started with ThermalVision AI and transform your surveillance infrastructure today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-purple font-semibold text-lg hover:opacity-90 transition-opacity shadow-neon-blue"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 rounded-lg border border-cyber-blue/30 font-semibold text-lg hover:bg-cyber-blue/10 transition-colors"
              >
                Existing User Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-cyber-blue/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Crosshair className="w-8 h-8 text-cyber-blue" />
                <div>
                  <h3 className="text-lg font-bold">ThermalVision</h3>
                  <p className="text-xs text-cyber-blue/60 font-mono">AI SURVEILLANCE</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Next-generation AI-powered thermal surveillance platform for advanced security operations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-cyber-blue transition-colors">Features</a></li>
                <li><a href="#technology" className="hover:text-cyber-blue transition-colors">Technology</a></li>
                <li><a href="#about" className="hover:text-cyber-blue transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyber-blue transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-cyber-blue transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-cyber-blue transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>contact@thermalvision.ai</li>
                <li>+1 (555) 123-4567</li>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-cyber-blue/10 text-center text-sm text-gray-500">
            <p>&copy; 2024 ThermalVision AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
