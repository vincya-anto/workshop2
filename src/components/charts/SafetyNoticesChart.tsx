import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import type { StatusSlice } from '../../data/dashboard.ts'
import { CHART_COLORS, CHART_TOOLTIP_STYLE } from '../../utils/chartTheme.ts'
import { ChartFrame } from './ChartFrame.tsx'

type SafetyNoticesChartProps = {
  data: StatusSlice[]
}

export function SafetyNoticesChart({ data }: SafetyNoticesChartProps) {
  return (
    <ChartFrame heightPx={196}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 12 }}>
        <CartesianGrid
          stroke="var(--modus-wc-color-base-200)"
          strokeDasharray="3 3"
          horizontal={false}
        />
        <XAxis
          type="number"
          stroke="var(--modus-wc-color-base-content-low-contrast)"
          tick={{ fontSize: 11 }}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={108}
          stroke="var(--modus-wc-color-base-content-low-contrast)"
          tick={{ fontSize: 11 }}
        />
        <Tooltip {...CHART_TOOLTIP_STYLE} />
        <Bar dataKey="value" fill={CHART_COLORS[1]} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartFrame>
  )
}
