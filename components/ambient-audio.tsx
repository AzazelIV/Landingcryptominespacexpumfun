"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play, Volume2, VolumeX } from "lucide-react"

export function AmbientAudio({ label }: { label: string }) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const contextRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const nodesRef = useRef<OscillatorNode[]>([])

  useEffect(() => () => { nodesRef.current.forEach((node) => node.stop()); contextRef.current?.close() }, [])
  const togglePlay = async () => {
    if (!contextRef.current) {
      const context = new AudioContext()
      const master = context.createGain()
      const lowpass = context.createBiquadFilter()
      master.gain.value = 0
      lowpass.type = "lowpass"
      lowpass.frequency.value = 1350
      lowpass.Q.value = 0.7
      lowpass.connect(master).connect(context.destination)

      const engine = context.createOscillator()
      const resonance = context.createOscillator()
      const subDrone = context.createOscillator()
      const engineGain = context.createGain()
      const resonanceGain = context.createGain()
      const subGain = context.createGain()
      engine.type = "sine"; engine.frequency.value = 49; engineGain.gain.value = 0.12
      resonance.type = "triangle"; resonance.frequency.value = 93; resonanceGain.gain.value = 0.035
      subDrone.type = "sine"; subDrone.frequency.value = 28; subGain.gain.value = 0.16
      engine.connect(engineGain).connect(lowpass)
      resonance.connect(resonanceGain).connect(lowpass)
      subDrone.connect(subGain).connect(lowpass)

      const staticBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate)
      const staticData = staticBuffer.getChannelData(0)
      for (let index = 0; index < staticData.length; index += 1) staticData[index] = (Math.random() * 2 - 1) * 0.18
      const staticSource = context.createBufferSource()
      const staticGain = context.createGain()
      const staticFilter = context.createBiquadFilter()
      staticSource.buffer = staticBuffer; staticSource.loop = true
      staticFilter.type = "bandpass"; staticFilter.frequency.value = 420; staticFilter.Q.value = 0.35
      staticGain.gain.value = 0.012
      staticSource.connect(staticFilter).connect(staticGain).connect(lowpass)

      const pulse = context.createOscillator()
      const pulseGain = context.createGain()
      pulse.type = "sine"; pulse.frequency.value = 74; pulseGain.gain.value = 0
      pulse.connect(pulseGain).connect(lowpass)
      const pulseLfo = context.createOscillator()
      const pulseDepth = context.createGain()
      pulseLfo.frequency.value = 0.045; pulseDepth.gain.value = 0.018
      pulseLfo.connect(pulseDepth).connect(pulseGain.gain)

      engine.start(); resonance.start(); subDrone.start(); staticSource.start(); pulse.start(); pulseLfo.start()
      contextRef.current = context; gainRef.current = master; nodesRef.current = [engine, resonance, subDrone, pulse, pulseLfo]
    }
    const context = contextRef.current
    if (!context || !gainRef.current) return
    if (playing) { await context.suspend(); setPlaying(false) }
    else { await context.resume(); gainRef.current.gain.setTargetAtTime(muted ? 0 : 0.18, context.currentTime, 1.4); setPlaying(true) }
  }
  const toggleMute = () => { const next = !muted; setMuted(next); const context = contextRef.current; if (context && gainRef.current) gainRef.current.gain.setTargetAtTime(next ? 0 : 0.18, context.currentTime, 0.35) }
  return <div className="ambient-audio" aria-label={label}><span>{label}</span><button onClick={togglePlay} aria-label={playing ? `${label}: pause` : `${label}: play`}>{playing ? <Pause data-icon="inline-start" /> : <Play data-icon="inline-start" />}</button><button onClick={toggleMute} aria-label={muted ? `${label}: unmute` : `${label}: mute`}>{muted ? <VolumeX /> : <Volume2 />}</button></div>
}
