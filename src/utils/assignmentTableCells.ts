import type { ITableColumn } from '@trimble-oss/moduswebcomponents'

function badgeColor(status: string): string {
  if (status === 'Closed' || status === 'Approved') return 'success'
  if (status === 'Open' || status === 'Submitted') return 'warning'
  if (status === 'Pending reinspect' || status === 'Rejected') return 'danger'
  return 'default'
}

function createBadge(label: string, color: string): HTMLElement {
  const badge = document.createElement('modus-wc-badge')
  badge.setAttribute('variant', 'filled')
  badge.setAttribute('size', 'sm')
  badge.setAttribute('color', color)
  badge.textContent = label
  return badge
}

export const ASSIGNMENT_COLUMNS: ITableColumn[] = [
  { id: 'id', accessor: 'id', header: 'ID', width: '7rem', sortable: true },
  { id: 'type', accessor: 'type', header: 'Type', sortable: true },
  { id: 'title', accessor: 'title', header: 'Title', sortable: true },
  {
    id: 'status',
    accessor: 'status',
    header: 'Status',
    width: '10rem',
    cellRenderer: (value) => createBadge(String(value ?? ''), badgeColor(String(value ?? ''))),
  },
  { id: 'assignee', accessor: 'assignee', header: 'Assigned to', width: '8rem' },
  { id: 'due', accessor: 'due', header: 'Due', width: '8rem', sortable: true },
]
