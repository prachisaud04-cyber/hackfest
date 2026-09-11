'use client'

import { useEffect, useRef } from 'react'

export function AnimatedNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let width = 0
    let height = 0
    const pointer = { x: -1000, y: -1000 }
    const nodes: { x: number; y: number; vx: number; vy: number }[] = []
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      nodes.length = 0
      const count = reduced ? 28 : width < 700 ? 34 : 62
      for (let i = 0; i < count; i++) nodes.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .16 })
    }
    const move = (event: MouseEvent) => { pointer.x = event.clientX; pointer.y = event.clientY }
    const draw = () => {
      context.clearRect(0, 0, width, height)
      for (const node of nodes) {
        if (!reduced) { node.x += node.vx; node.y += node.vy; if (node.x < -20 || node.x > width + 20) node.vx *= -1; if (node.y < -20 || node.y > height + 20) node.vy *= -1 }
        const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y)
        if (distance < 140 && !reduced) { node.x += (node.x - pointer.x) / distance * .12; node.y += (node.y - pointer.y) / distance * .12 }
      }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], distance = Math.hypot(a.x - b.x, a.y - b.y)
        if (distance < 145) { const nearPointer = Math.min(Math.hypot(a.x - pointer.x, a.y - pointer.y), Math.hypot(b.x - pointer.x, b.y - pointer.y)) < 150; context.strokeStyle = nearPointer ? 'rgba(39,221,227,.23)' : 'rgba(139,124,255,.10)'; context.lineWidth = nearPointer ? 1 : .6; context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke() }
      }
      for (const node of nodes) { context.fillStyle = 'rgba(39,221,227,.48)'; context.beginPath(); context.arc(node.x, node.y, 1.5, 0, Math.PI * 2); context.fill() }
      if (!reduced) frame = requestAnimationFrame(draw)
    }
    resize(); draw(); window.addEventListener('resize', resize); window.addEventListener('mousemove', move)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', move) }
  }, [])
  return <canvas ref={canvasRef} aria-hidden="true" className="network-canvas" />
}
