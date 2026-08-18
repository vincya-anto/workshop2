import { ModusWcCard, ModusWcTable, ModusWcTypography } from '@trimble-oss/moduswebcomponents-react'
import type { AssignmentRow } from '../data/dashboard.ts'
import { ASSIGNMENT_COLUMNS } from '../utils/assignmentTableCells.ts'

type AssignmentRecordsTableProps = {
  rows: AssignmentRow[]
}

export function AssignmentRecordsTable({ rows }: AssignmentRecordsTableProps) {
  return (
    <ModusWcCard bordered padding="compact">
      <div className="flex min-w-0 flex-col gap-3">
        <ModusWcTypography
          hierarchy="h2"
          size="md"
          weight="semibold"
          customClass="!m-0"
          label="Assignments"
        />
        <div className="min-w-0 overflow-x-auto">
          <ModusWcTable
            caption="Filtered project assignments"
            columns={ASSIGNMENT_COLUMNS}
            data={rows}
            density="compact"
            hover
            mode="simple"
            sortable
            zebra
          />
        </div>
        <div hidden={rows.length > 0}>
          <ModusWcTypography
            hierarchy="p"
            size="sm"
            customClass="!m-0 text-[var(--modus-wc-color-base-content-low-contrast)]"
            label="No assignments match the current filters."
          />
        </div>
      </div>
    </ModusWcCard>
  )
}
