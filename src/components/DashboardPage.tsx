import {
  ModusWcButton,
  ModusWcIcon,
  ModusWcTypography,
} from '@trimble-oss/moduswebcomponents-react'
import { useMemo, useState } from 'react'
import {
  ASSIGNMENT_ROWS,
  DUE_TODAY_ITEMS,
  DUE_WEEK_ITEMS,
  NOTICES_TO_COMPLY,
  OVERDUE_ITEMS,
  PUNCH_STATUS,
  RFI_STATUS,
  SAFETY_NOTICES,
  SUBMITTAL_STATUS,
  WORK_PROGRESS,
  type AssignmentRow,
} from '../data/dashboard.ts'
import { PAGE_COPY } from '../data/nav.ts'
import { AssignmentRecordsTable } from './AssignmentRecordsTable.tsx'
import { DuePieChart } from './charts/DuePieChart.tsx'
import { SafetyNoticesChart } from './charts/SafetyNoticesChart.tsx'
import { StatusBarChart } from './charts/StatusBarChart.tsx'
import { WorkProgressGauge } from './charts/WorkProgressGauge.tsx'
import { ProjectHeaderCard } from './ProjectHeaderCard.tsx'
import { WidgetCard } from './WidgetCard.tsx'

type DashboardPageProps = {
  assignmentsOpen: boolean
  onToggleAssignments: () => void
  onToast: (title: string) => void
  assignedTo: string
  company: string
  recordType: string
  status: string
  dueDate: string
}

const ALL_WIDGETS = [
  'progress',
  'notices',
  'safety',
  'overdue',
  'today',
  'week',
  'rfis',
  'submittals',
  'punch',
] as const

type WidgetId = (typeof ALL_WIDGETS)[number]
type ViewMode = 'dashboard' | 'list'

function matchesFilters(
  row: AssignmentRow,
  assignedTo: string,
  company: string,
  recordType: string,
  status: string,
  dueDate: string,
): boolean {
  if (assignedTo === 'me' && row.assignee !== 'Me') return false
  if (company === 'mine' && row.company !== 'My company') return false
  if (recordType !== 'all') {
    const map: Record<string, AssignmentRow['type']> = {
      rfi: 'RFI',
      submittal: 'Submittal',
      punch: 'Punch item',
      checklist: 'Checklist',
    }
    if (row.type !== map[recordType]) return false
  }
  if (status === 'open' && !['Open', 'Submitted', 'Pending reinspect'].includes(row.status)) {
    return false
  }
  if (status === 'closed' && row.status !== 'Closed' && row.status !== 'Approved') {
    return false
  }
  if (dueDate === 'overdue' && row.due !== 'Overdue') return false
  if (dueDate === 'today' && row.due !== 'Today') return false
  if (dueDate === 'week' && row.due !== 'In 3 days' && row.due !== 'Today') return false
  return true
}

export function DashboardPage({
  assignmentsOpen,
  onToggleAssignments,
  onToast,
  assignedTo,
  company,
  recordType,
  status,
  dueDate,
}: DashboardPageProps) {
  const [view, setView] = useState<ViewMode>('dashboard')
  const [editMode, setEditMode] = useState(false)
  const [hiddenWidgets, setHiddenWidgets] = useState<ReadonlySet<WidgetId>>(() => new Set())
  const copy = PAGE_COPY.home

  const filteredRows = useMemo(
    () =>
      ASSIGNMENT_ROWS.filter((row) =>
        matchesFilters(row, assignedTo, company, recordType, status, dueDate),
      ),
    [assignedTo, company, recordType, status, dueDate],
  )

  const dismiss = (id: WidgetId) => {
    setHiddenWidgets((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  const show = (id: WidgetId) => !hiddenWidgets.has(id)

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <section className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <ModusWcTypography
            hierarchy="h1"
            size="2xl"
            weight="semibold"
            customClass="!m-0"
            label={copy.title}
          />
          <ModusWcTypography
            hierarchy="p"
            size="sm"
            customClass="!m-0 text-[var(--modus-wc-color-base-content-low-contrast)]"
            label={copy.description}
          />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <ModusWcButton
            variant="outlined"
            color="tertiary"
            size="sm"
            aria-label={assignmentsOpen ? 'Hide assignments' : 'Show assignments'}
            onButtonClick={onToggleAssignments}
          >
            <ModusWcIcon name="filter" size="xs" decorative />
            Assignments
          </ModusWcButton>
          <ModusWcButton
            variant="outlined"
            color="tertiary"
            size="sm"
            onButtonClick={() => onToast('Print dialog is not available in this preview.')}
          >
            <ModusWcIcon name="printer" size="xs" decorative />
            Print
          </ModusWcButton>
          <ModusWcButton
            variant="filled"
            color="primary"
            size="sm"
            onButtonClick={() => onToast('Export started for the current dashboard.')}
          >
            <ModusWcIcon name="export" size="xs" decorative />
            Export
          </ModusWcButton>
          <ModusWcButton
            variant="borderless"
            color="tertiary"
            shape="square"
            size="sm"
            pressed={view === 'list'}
            aria-label="List view"
            onButtonClick={() => setView('list')}
          >
            <ModusWcIcon name="view_list" size="xs" decorative />
          </ModusWcButton>
          <ModusWcButton
            variant="borderless"
            color="tertiary"
            shape="square"
            size="sm"
            pressed={view === 'dashboard'}
            aria-label="Dashboard view"
            onButtonClick={() => setView('dashboard')}
          >
            <ModusWcIcon name="dashboard" size="xs" decorative />
          </ModusWcButton>
          <ModusWcButton
            variant="borderless"
            color="tertiary"
            shape="square"
            size="sm"
            pressed={editMode}
            aria-label="Edit widgets"
            onButtonClick={() => setEditMode((prev) => !prev)}
          >
            <ModusWcIcon name="pencil" size="xs" decorative />
          </ModusWcButton>
        </div>
      </section>

      {view === 'dashboard' ? (
        <>
          <ProjectHeaderCard onAction={onToast} />
          <div className="widget-grid">
            {show('progress') ? (
              <WidgetCard
                title="Work progress"
                icon="gantt_chart"
                onDismiss={editMode ? () => dismiss('progress') : undefined}
                footer="Mar 3, 2025 — Nov 21, 2026"
              >
                <WorkProgressGauge percent={WORK_PROGRESS} />
              </WidgetCard>
            ) : null}
            {show('notices') ? (
              <WidgetCard
                title="Notices to comply"
                icon="warning"
                onDismiss={editMode ? () => dismiss('notices') : undefined}
                footer="Average turnaround: 4.2 days"
              >
                <StatusBarChart data={NOTICES_TO_COMPLY} />
              </WidgetCard>
            ) : null}
            {show('safety') ? (
              <WidgetCard
                title="Top 5 safety notices by type"
                icon="shield"
                onDismiss={editMode ? () => dismiss('safety') : undefined}
              >
                <SafetyNoticesChart data={SAFETY_NOTICES} />
              </WidgetCard>
            ) : null}
            {show('overdue') ? (
              <WidgetCard
                title="Overdue items"
                icon="clock_delay_warning"
                onDismiss={editMode ? () => dismiss('overdue') : undefined}
              >
                <DuePieChart data={OVERDUE_ITEMS} />
              </WidgetCard>
            ) : null}
            {show('today') ? (
              <WidgetCard
                title="Due today items"
                icon="calendar"
                onDismiss={editMode ? () => dismiss('today') : undefined}
              >
                <DuePieChart data={DUE_TODAY_ITEMS} />
              </WidgetCard>
            ) : null}
            {show('week') ? (
              <WidgetCard
                title="Due in next 7 days"
                icon="calendar_week"
                onDismiss={editMode ? () => dismiss('week') : undefined}
              >
                <DuePieChart data={DUE_WEEK_ITEMS} />
              </WidgetCard>
            ) : null}
            {show('rfis') ? (
              <WidgetCard
                title="RFIs"
                icon="file_type_rfi"
                onDismiss={editMode ? () => dismiss('rfis') : undefined}
                footer="Average turnaround: 3.1 days"
              >
                <StatusBarChart data={RFI_STATUS} />
              </WidgetCard>
            ) : null}
            {show('submittals') ? (
              <WidgetCard
                title="Submittals"
                icon="file_check_in"
                onDismiss={editMode ? () => dismiss('submittals') : undefined}
                footer="Average turnaround: 6.8 days"
              >
                <StatusBarChart data={SUBMITTAL_STATUS} />
              </WidgetCard>
            ) : null}
            {show('punch') ? (
              <WidgetCard
                title="Punch items"
                icon="clipboard_check"
                onDismiss={editMode ? () => dismiss('punch') : undefined}
                footer="Average turnaround: 5.0 days"
              >
                <StatusBarChart data={PUNCH_STATUS} />
              </WidgetCard>
            ) : null}
          </div>
        </>
      ) : (
        <AssignmentRecordsTable rows={filteredRows} />
      )}
    </div>
  )
}
