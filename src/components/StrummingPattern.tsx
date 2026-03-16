interface StrummingPatternProps {
  pattern: string[]
  title?: string
}

const arrowConfig: Record<string, { label: string; color: string; arrow: 'down' | 'up' | 'none' }> = {
  down: { label: 'GIU', color: '#e88a10', arrow: 'down' },
  up: { label: 'SU', color: '#3b82f6', arrow: 'up' },
  miss: { label: '(aria)', color: '#b5aea5', arrow: 'none' },
}

export default function StrummingPattern({ pattern, title }: StrummingPatternProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
      {title && (
        <h4 className="text-sm font-semibold text-surface-400 uppercase tracking-wider mb-4">
          {title}
        </h4>
      )}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {pattern.map((beat, i) => {
          const cfg = arrowConfig[beat]
          if (!cfg) return null
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-1"
            >
              <div
                className="w-12 h-16 sm:w-14 sm:h-20 rounded-xl flex items-center justify-center transition-all duration-300 border"
                style={{
                  backgroundColor: `${cfg.color}10`,
                  borderColor: `${cfg.color}30`,
                }}
              >
                {cfg.arrow === 'down' && (
                  <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                    <path
                      d="M12 4L12 28M12 28L4 20M12 28L20 20"
                      stroke={cfg.color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {cfg.arrow === 'up' && (
                  <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                    <path
                      d="M12 32L12 8M12 8L4 16M12 8L20 16"
                      stroke={cfg.color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {cfg.arrow === 'none' && (
                  <span className="text-2xl text-surface-300">~</span>
                )}
              </div>
              <span
                className="text-[10px] sm:text-xs font-bold tracking-wide"
                style={{ color: cfg.color }}
              >
                {cfg.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
