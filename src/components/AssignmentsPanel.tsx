import {
  ModusWcButton,
  ModusWcIcon,
  ModusWcSelect,
  ModusWcTypography,
  ModusWcUtilityPanel,
} from '@trimble-oss/moduswebcomponents-react'
import type { ISelectOption } from '@trimble-oss/moduswebcomponents'
import { useEffect, useRef } from 'react'
import { readInputString } from '../utils/modusFormEvents.ts'

type AssignmentsPanelProps = {
  expanded: boolean
  pushContent: boolean
  target: HTMLElement | null
  assignedTo: string
  company: string
  recordType: string
  status: string
  dueDate: string
  onAssignedTo: (value: string) => void
  onCompany: (value: string) => void
  onRecordType: (value: string) => void
  onStatus: (value: string) => void
  onDueDate: (value: string) => void
  onClose: () => void
}

const ASSIGNED_OPTIONS: ISelectOption[] = [
  { label: 'Me (1)', value: 'me' },
  { label: 'Anyone', value: 'anyone' },
]

const COMPANY_OPTIONS: ISelectOption[] = [
  { label: 'My company (1)', value: 'mine' },
  { label: 'All companies', value: 'all' },
]

const RECORD_OPTIONS: ISelectOption[] = [
  { label: 'All', value: 'all' },
  { label: 'RFI', value: 'rfi' },
  { label: 'Submittal', value: 'submittal' },
  { label: 'Punch item', value: 'punch' },
  { label: 'Checklist', value: 'checklist' },
]

const STATUS_OPTIONS: ISelectOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
]

const DUE_OPTIONS: ISelectOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Due today', value: 'today' },
  { label: 'Due in next 7 days', value: 'week' },
]

type PanelHost = HTMLElement & { targetElement: HTMLElement | null }

export function AssignmentsPanel({
  expanded,
  pushContent,
  target,
  assignedTo,
  company,
  recordType,
  status,
  dueDate,
  onAssignedTo,
  onCompany,
  onRecordType,
  onStatus,
  onDueDate,
  onClose,
}: AssignmentsPanelProps) {
  const panelRef = useRef<PanelHost | null>(null)

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.targetElement = target
    }
  }, [target])

  return (
    <ModusWcUtilityPanel
      ref={(element) => {
        panelRef.current = element as PanelHost | null
      }}
      expanded={expanded}
      pushContent={pushContent}
      collapseOnClickOutside={!pushContent}
      aria-label="Assignments"
      onPanelClosed={onClose}
    >
      <div slot="header" className="flex w-full items-center justify-between gap-3">
        <ModusWcTypography
          hierarchy="h2"
          size="md"
          weight="semibold"
          customClass="!m-0"
          label="Assignments"
        />
        <ModusWcButton
          variant="borderless"
          color="tertiary"
          shape="square"
          size="xs"
          aria-label="Close assignments"
          onButtonClick={onClose}
        >
          <ModusWcIcon name="close" size="xs" decorative />
        </ModusWcButton>
      </div>
      <div slot="body" className="assignments-filters">
        <ModusWcTypography
          hierarchy="p"
          size="sm"
          weight="semibold"
          customClass="!m-0"
          label="By"
        />
        <ModusWcSelect
          label="Assigned to"
          size="sm"
          value={assignedTo}
          options={ASSIGNED_OPTIONS}
          onInputChange={(event: CustomEvent) => onAssignedTo(readInputString(event))}
        />
        <ModusWcSelect
          label="Company"
          size="sm"
          value={company}
          options={COMPANY_OPTIONS}
          onInputChange={(event: CustomEvent) => onCompany(readInputString(event))}
        />
        <ModusWcSelect
          label="Record type"
          size="sm"
          value={recordType}
          options={RECORD_OPTIONS}
          onInputChange={(event: CustomEvent) => onRecordType(readInputString(event))}
        />
        <ModusWcSelect
          label="Status"
          size="sm"
          value={status}
          options={STATUS_OPTIONS}
          onInputChange={(event: CustomEvent) => onStatus(readInputString(event))}
        />
        <ModusWcSelect
          label="Due date"
          size="sm"
          value={dueDate}
          options={DUE_OPTIONS}
          onInputChange={(event: CustomEvent) => onDueDate(readInputString(event))}
        />
      </div>
      <div slot="footer">
        <ModusWcTypography
          hierarchy="p"
          size="sm"
          customClass="!m-0 text-[var(--modus-wc-color-base-content-low-contrast)]"
          label="No assignments"
        />
      </div>
    </ModusWcUtilityPanel>
  )
}
