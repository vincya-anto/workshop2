import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import type { StatusSlice } from '../../data/dashboard.ts'
import { CHART_COLORS, CHART_TOOLTIP_STYLE } from '../../utils/chartTheme.ts'
import { ChartFrame } from './ChartFrame.tsx'

type StatusBarChartProps = {
  data: StatusSlice[]
}

export function StatusBarChart({ data }: StatusBarChartProps) {
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
          width={88}
          stroke="var(--modus-wc-color-base-content-low-contrast)"
          tick={{ fontSize: 11 }}
        />
        <Tooltip {...CHART_TOOLTIP_STYLE} />
        <Bar dataKey="value" fill={CHART_COLORS[0]} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartFrame>
  )
}
