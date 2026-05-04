export function EllipseLoader() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <img
        src="/icons/ellipse.svg"
        alt="loading"
        style={{
          animation: 'ellipsePulse 1.5s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes ellipsePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.92); }
        }
      `}</style>
    </div>
  )
}
