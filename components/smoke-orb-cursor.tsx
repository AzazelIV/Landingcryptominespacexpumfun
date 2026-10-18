"use client"

import { useEffect, useRef } from "react"

export function SmokeOrbCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !window.matchMedia("(pointer: fine) and (hover: hover)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const context = canvas.getContext("2d")
    if (!context) return
    const particles: Array<{ x: number; y: number; size: number; opacity: number; life: number; decay: number }> = []
    let frame = 0
    let raf = 0
    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let orbX = pointerX
    let orbY = pointerY
    let hovering = false

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const move = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      const target = event.target as HTMLElement | null
      hovering = Boolean(target?.closest("a, button, input, select, textarea"))
    }
    const render = () => {
      orbX += (pointerX - orbX) * 0.18
      orbY += (pointerY - orbY) * 0.18
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      if (frame % 2 === 0 && particles.length < 28) particles.push({ x: orbX, y: orbY, size: 2 + Math.random() * 5, opacity: 0.16 + Math.random() * 0.2, life: 1, decay: 0.018 + Math.random() * 0.018 })
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index]
        particle.life -= particle.decay
        particle.y += 0.25
        particle.size += 0.08
        if (particle.life <= 0) particles.splice(index, 1)
        else {
          context.beginPath()
          context.fillStyle = `rgba(205, 216, 209, ${particle.opacity * particle.life})`
          context.arc(particle.x, particle.y, particle.size * (2 - particle.life), 0, Math.PI * 2)
          context.fill()
        }
      }
      const radius = hovering ? 6 : 4
      const glow = context.createRadialGradient(orbX, orbY, 0, orbX, orbY, hovering ? 22 : 16)
      glow.addColorStop(0, "rgba(245, 250, 245, .95)")
      glow.addColorStop(0.35, "rgba(200, 220, 203, .3)")
      glow.addColorStop(1, "rgba(200, 220, 203, 0)")
      context.fillStyle = glow
      context.beginPath()
      context.arc(orbX, orbY, hovering ? 22 : 16, 0, Math.PI * 2)
      context.fill()
      context.fillStyle = "rgba(245, 250, 245, .95)"
      context.beginPath()
      context.arc(orbX, orbY, radius, 0, Math.PI * 2)
      context.fill()
      frame += 1
      raf = requestAnimationFrame(render)
    }
    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", move, { passive: true })
    raf = requestAnimationFrame(render)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move) }
  }, [])

  return <canvas ref={canvasRef} className="smoke-orb-cursor" aria-hidden="true" />
}
