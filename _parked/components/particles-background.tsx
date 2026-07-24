"use client"

import { Particles } from "@/components/ui/particles"
import { useTheme } from "next-themes"
import { useCallback, useEffect, useState, memo, useMemo } from "react"
import { useWindowSize } from "@/lib/hooks/use-window-size"

// Determine if we're in a high-performance environment
const useIsHighPerformance = () => {
  const [isHighPerformance, setIsHighPerformance] = useState<boolean | null>(null)
  
  useEffect(() => {
    // Check for low-end devices or browsers
    const checkPerformance = () => {
      // Check if device has limited memory or CPU
      const memory = (navigator as any).deviceMemory
      const concurrency = navigator.hardwareConcurrency
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (
        (memory && memory < 4) || // Less than 4GB RAM
        (concurrency && concurrency < 4) || // Less than 4 cores
        isMobile || // Mobile device
        prefersReducedMotion // User prefers reduced motion
      ) {
        setIsHighPerformance(false)
      } else {
        setIsHighPerformance(true)
      }
    }
    
    try {
      // Only run in browser
      if (typeof window !== 'undefined') {
        checkPerformance()
      }
    } catch (e) {
      // If we can't detect, assume high performance
      console.warn("Could not detect device performance:", e)
      setIsHighPerformance(true)
    }
  }, [])
  
  return isHighPerformance === null ? true : isHighPerformance
}

function ParticlesBackgroundComponent() {
  const { theme, resolvedTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState(theme)
  const { width } = useWindowSize()
  const isHighPerformance = useIsHighPerformance()
  const [isVisible, setIsVisible] = useState(false)
  
  // Lazy initialization - only show particles after a delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true)
    }, 300) // Delay rendering to prioritize main content
    
    return () => clearTimeout(timeoutId)
  }, [])
  
  // Debounce theme changes to prevent flickering
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentTheme(resolvedTheme || theme)
    }, 100)
    
    return () => clearTimeout(timeoutId)
  }, [theme, resolvedTheme])
  
  // Calculate responsive quantity based on screen width and device performance
  const getQuantity = useCallback(() => {
    if (!width) return 200
    
    // Reduce particles for low-performance devices
    const performanceMultiplier = isHighPerformance ? 1 : 0.5
    
    // Scale particles based on screen width - doubled from previous values
    if (width < 640) return Math.floor(100 * performanceMultiplier) // Mobile
    if (width < 1024) return Math.floor(200 * performanceMultiplier) // Tablet
    if (width < 1536) return Math.floor(300 * performanceMultiplier) // Laptop
    return Math.floor(400 * performanceMultiplier) // Desktop
  }, [width, isHighPerformance])
  
  // Memoize particle props to prevent unnecessary recalculations
  const particleProps = useMemo(() => ({
    quantity: getQuantity(),
    staticity: isHighPerformance ? 30 : 50, // Less movement on low-end devices
    color: currentTheme === "dark" ? "#ffffff" : "#000000",
    ease: isHighPerformance ? 50 : 80, // Smoother animation on low-end devices
    size: isHighPerformance ? 0.4 : 0.6, // Larger particles are less resource-intensive
  }), [getQuantity, isHighPerformance, currentTheme])
  
  // Don't render anything until we're ready to show particles
  if (!isVisible) return null
  
  return (
    <Particles
      className="fixed inset-0 -z-10 animate-fade-in"
      refresh={false}
      {...particleProps}
    />
  )
}

// Memoize the component to prevent unnecessary re-renders
export const ParticlesBackground = memo(ParticlesBackgroundComponent) 