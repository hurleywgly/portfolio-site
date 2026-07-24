'use client'

import { useTheme } from "next-themes"
import Image from "next/image"
import { useState, useEffect } from "react"

interface ThemeAwareImageProps {
  lightSrc: string
  darkSrc: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function ThemeAwareImage({ 
  lightSrc, 
  darkSrc, 
  alt,
  width,
  height,
  className 
}: ThemeAwareImageProps) {
  const { theme, systemTheme } = useTheme()
  const [currentSrc, setCurrentSrc] = useState(lightSrc)
  const [error, setError] = useState(false)

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme
    setCurrentSrc(currentTheme === 'dark' ? darkSrc : lightSrc)
  }, [theme, systemTheme, lightSrc, darkSrc])

  if (error) {
    console.warn(`Failed to load image: ${currentSrc}`)
    return (
      <div 
        className={`bg-muted flex items-center justify-center ${className}`}
        style={{ width: width || 24, height: height || 24 }}
      >
        {alt[0]}
      </div>
    )
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  )
} 