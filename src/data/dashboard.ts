export type StatusSlice = {
  name: string
  value: number
}

export type AssignmentRow = {
  id: string
  type: 'RFI' | 'Submittal' | 'Punch item' | 'Checklist'
  title: string
  status: string
  assignee: 'Me' | 'Team'
  company: 'My company' | 'Other'
  due: 'Overdue' | 'Today' | 'In 3 days' | 'Later'
}

export const WORK_PROGRESS = 62

export const NOTICES_TO_COMPLY: StatusSlice[] = [
  { name: 'Open', value: 6 },
  { name: 'Closed', value: 14 },
  { name: 'On Hold', value: 2 },
]

export const SAFETY_NOTICES: StatusSlice[] = [
  { name: 'PPE', value: 8 },
  { name: 'Housekeeping', value: 5 },
  { name: 'Fall protection', value: 4 },
  { name: 'Electrical', value: 3 },
  { name: 'Access', value: 2 },
]

export const OVERDUE_ITEMS: StatusSlice[] = [
  { name: 'RFIs', value: 3 },
  { name: 'Punch', value: 5 },
  { name: 'Submittals', value: 2 },
]

export const DUE_TODAY_ITEMS: StatusSlice[] = [
  { name: 'RFIs', value: 2 },
  { name: 'Checklists', value: 4 },
  { name: 'Punch', value: 1 },
]

export const DUE_WEEK_ITEMS: StatusSlice[] = [
  { name: 'RFIs', value: 4 },
  { name: 'Submittals', value: 6 },
  { name: 'Punch', value: 3 },
]

export const RFI_STATUS: StatusSlice[] = [
  { name: 'Open', value: 9 },
  { name: 'Closed', value: 21 },
  { name: 'N/A', value: 1 },
]

export const SUBMITTAL_STATUS: StatusSlice[] = [
  { name: 'Submitted', value: 7 },
  { name: 'Rejected', value: 2 },
  { name: 'Approved', value: 18 },
]

export const PUNCH_STATUS: StatusSlice[] = [
  { name: 'Open', value: 11 },
  { name: 'Pending reinspect', value: 4 },
  { name: 'Closed', value: 27 },
]

export const ASSIGNMENT_ROWS: AssignmentRow[] = [
  {
    id: 'RFI-1042',
    type: 'RFI',
    title: 'Clarify beam pocket at grid C-4',
    status: 'Open',
    assignee: 'Me',
    company: 'My company',
    due: 'Today',
  },
  {
    id: 'SUB-318',
    type: 'Submittal',
    title: 'Storefront glazing package',
    status: 'Submitted',
    assignee: 'Me',
    company: 'My company',
    due: 'In 3 days',
  },
  {
    id: 'PCH-77',
    type: 'Punch item',
    title: 'Touch-up paint at lobby soffit',
    status: 'Pending reinspect',
    assignee: 'Team',
    company: 'My company',
    due: 'Overdue',
  },
  {
    id: 'CHK-12',
    type: 'Checklist',
    title: 'Weekly safety walk',
    status: 'Open',
    assignee: 'Me',
    company: 'My company',
    due: 'Today',
  },
  {
    id: 'RFI-1038',
    type: 'RFI',
    title: 'Rebar splice at north core',
    status: 'Closed',
    assignee: 'Team',
    company: 'Other',
    due: 'Later',
  },
]
