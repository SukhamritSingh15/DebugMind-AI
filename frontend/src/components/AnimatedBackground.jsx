function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* Main glow */}
      <div className="hero-glow hero-glow-one" />

      <div className="hero-glow hero-glow-two" />

      <div className="hero-glow hero-glow-three" />

      {/* Grid */}
      <div className="hero-grid" />

      {/* Particles */}
      <span className="particle particle-one" />
      <span className="particle particle-two" />
      <span className="particle particle-three" />
      <span className="particle particle-four" />
      <span className="particle particle-five" />

    </div>
  )
}

export default AnimatedBackground