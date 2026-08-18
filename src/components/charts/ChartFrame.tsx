import type { ReactNode } from 'react'
import { ResponsiveContainer } from 'recharts'

type ChartFrameProps = {
  heightPx: number
  children: ReactNode
}

export function ChartFrame({ heightPx, children }: ChartFrameProps) {
  return (
    <div className="min-h-0 w-full min-w-0" style={{ height: heightPx }}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        initialDimension={{ width: 480, height: heightPx }}
        minWidth={0}
        minHeight={heightPx}
      >
        {children}
      </ResponsiveContainer>
    </div>
  )
}
