export type NavId =
  | 'home'
  | 'information'
  | 'drawings'
  | 'photos'
  | 'records'
  | 'rfis'
  | 'submittals'
  | 'daily-reports'
  | 'punch-items'
  | 'checklists'
  | 'files'
  | 'library'
  | 'models'
  | 'my-projects'

export type NavItem = {
  id: NavId
  label: string
  icon: string
  children?: NavItem[]
}

export const PRIMARY_NAV: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'information', label: 'Information management', icon: 'info' },
  { id: 'drawings', label: 'Drawings', icon: 'floorplan' },
  { id: 'photos', label: 'Photos', icon: 'camera' },
  {
    id: 'records',
    label: 'Records',
    icon: 'clipboard',
    children: [
      { id: 'rfis', label: 'RFIs', icon: 'file_type_rfi' },
      { id: 'submittals', label: 'Submittals', icon: 'file_check_in' },
      { id: 'daily-reports', label: 'Daily reports', icon: 'calendar' },
      { id: 'punch-items', label: 'Punch items', icon: 'clipboard_check' },
      { id: 'checklists', label: 'Checklists', icon: 'list_bulleted' },
    ],
  },
  { id: 'files', label: 'Files', icon: 'folder_closed' },
  { id: 'library', label: 'Library', icon: 'bookings' },
  { id: 'models', label: 'Models', icon: 'cube' },
]

export const FOOTER_NAV: NavItem = {
  id: 'my-projects',
  label: 'My Projects',
  icon: 'arrow_left',
}

export const PAGE_COPY: Record<NavId, { title: string; description: string }> = {
  home: {
    title: 'Home',
    description: 'Project dashboard for records, safety, and progress.',
  },
  information: {
    title: 'Information management',
    description: 'Project metadata, directories, and document control.',
  },
  drawings: {
    title: 'Drawings',
    description: 'Current drawing sets and revision history.',
  },
  photos: {
    title: 'Photos',
    description: 'Field photos and progress imagery.',
  },
  records: {
    title: 'Records',
    description: 'RFIs, submittals, reports, punch items, and checklists.',
  },
  rfis: {
    title: 'RFIs',
    description: 'Requests for information and turnaround status.',
  },
  submittals: {
    title: 'Submittals',
    description: 'Submitted, rejected, and approved packages.',
  },
  'daily-reports': {
    title: 'Daily reports',
    description: 'Crew, weather, and site activity logs.',
  },
  'punch-items': {
    title: 'Punch items',
    description: 'Open, pending reinspection, and closed punch items.',
  },
  checklists: {
    title: 'Checklists',
    description: 'Inspection and quality checklists.',
  },
  files: {
    title: 'Files',
    description: 'Project file library and shared documents.',
  },
  library: {
    title: 'Library',
    description: 'Standards, templates, and reference documents.',
  },
  models: {
    title: 'Models',
    description: 'Federated models and coordination views.',
  },
  'my-projects': {
    title: 'My Projects',
    description: 'Switch to another project in your portfolio.',
  },
}

export const PROJECTS = [
  { value: 'pallavi', label: 'PallaviNamingConventionProject' },
  { value: 'harbor', label: 'Harbor Heights' },
  { value: 'civic', label: 'Civic Center Retrofit' },
] as const
