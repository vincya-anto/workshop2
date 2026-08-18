import { ModusWcTypography } from '@trimble-oss/moduswebcomponents-react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import type { StatusSlice } from '../../data/dashboard.ts'
import { CHART_COLORS, CHART_TOOLTIP_STYLE } from '../../utils/chartTheme.ts'
import { ChartFrame } from './ChartFrame.tsx'

type DuePieChartProps = {
  data: StatusSlice[]
}

export function DuePieChart({ data }: DuePieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="flex flex-col items-center gap-1">
      <ChartFrame heightPx={180}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={42}
            outerRadius={70}
            stroke="var(--modus-wc-color-base-100)"
          >
            {data.map((item, index) => (
              <Cell key={item.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip {...CHART_TOOLTIP_STYLE} />
        </PieChart>
      </ChartFrame>
      <ModusWcTypography
        hierarchy="p"
        size="sm"
        customClass="!m-0 text-[var(--modus-wc-color-base-content-low-contrast)]"
        label={`Total: ${total}`}
      />
    </div>
  )
}
