import { ModusWcTypography } from '@trimble-oss/moduswebcomponents-react'
import { Cell, Pie, PieChart } from 'recharts'
import { CHART_COLORS } from '../../utils/chartTheme.ts'
import { ChartFrame } from './ChartFrame.tsx'

type WorkProgressGaugeProps = {
  percent: number
}

export function WorkProgressGauge({ percent }: WorkProgressGaugeProps) {
  const data = [
    { name: 'Complete', value: percent },
    { name: 'Remaining', value: 100 - percent },
  ]

  return (
    <div className="relative">
      <ChartFrame heightPx={180}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            innerRadius={58}
            outerRadius={80}
            stroke="var(--modus-wc-color-base-100)"
          >
            <Cell fill={CHART_COLORS[0]} />
            <Cell fill="var(--modus-wc-color-base-200)" />
          </Pie>
        </PieChart>
      </ChartFrame>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <ModusWcTypography
          hierarchy="p"
          size="lg"
          weight="semibold"
          customClass="!m-0"
          label={`${percent}%`}
        />
      </div>
    </div>
  )
}
