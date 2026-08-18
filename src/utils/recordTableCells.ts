import type { ITableColumn } from '@trimble-oss/moduswebcomponents'
import type { InformationRecord } from '../data/records'

function createRecordLink(name: string, id: string): HTMLElement {
  const link = document.createElement('modus-wc-link')
  link.setAttribute('href', `#${id}`)
  link.setAttribute('color', 'primary')
  link.setAttribute('underline', 'hover')
  link.textContent = name
  return link
}

function createRowActions(): HTMLElement {
  const dropdown = document.createElement('modus-wc-dropdown-menu')
  dropdown.setAttribute('button-aria-label', 'Record actions')
  dropdown.setAttribute('button-color', 'tertiary')
  dropdown.setAttribute('button-shape', 'square')
  dropdown.setAttribute('button-size', 'sm')
  dropdown.setAttribute('button-variant', 'borderless')
  dropdown.setAttribute('menu-placement', 'bottom-end')
  dropdown.setAttribute('menu-strategy', 'fixed')

  const button = document.createElement('div')
  button.setAttribute('slot', 'button')
  const icon = document.createElement('modus-wc-icon')
  icon.setAttribute('name', 'more_vertical')
  icon.setAttribute('size', 'xs')
  icon.setAttribute('decorative', '')
  button.appendChild(icon)

  const menu = document.createElement('div')
  menu.setAttribute('slot', 'menu')
  ;[
    { label: 'Open', value: 'open' },
    { label: 'Download', value: 'download' },
    { label: 'Delete', value: 'delete' },
  ].forEach((action) => {
    const item = document.createElement('modus-wc-menu-item')
    item.setAttribute('label', action.label)
    item.setAttribute('value', action.value)
    item.addEventListener('itemSelect', () => {
      ;(dropdown as HTMLElement & { menuVisible: boolean }).menuVisible = false
    })
    menu.appendChild(item)
  })

  dropdown.appendChild(button)
  dropdown.appendChild(menu)
  return dropdown
}

export const RECORD_COLUMNS: ITableColumn[] = [
  {
    id: 'recordName',
    accessor: 'recordName',
    header: 'Record Name',
    sortable: true,
    cellRenderer: (value, row) => {
      const record = row as InformationRecord
      return createRecordLink(String(value ?? ''), record.id)
    },
  },
  {
    id: 'recordDescription',
    accessor: 'recordDescription',
    header: 'Record Description',
    sortable: true,
  },
  {
    id: 'revision',
    accessor: 'revision',
    header: 'Revision',
    width: '7rem',
  },
  {
    id: 'suitability',
    accessor: 'suitability',
    header: 'Suitability',
    width: '7rem',
  },
  {
    id: 'author',
    accessor: 'author',
    header: 'Author',
    sortable: true,
  },
  {
    id: 'createdOn',
    accessor: 'createdOn',
    header: 'Created On',
    sortable: true,
    width: '9rem',
  },
  {
    id: 'workflowStatus',
    accessor: 'workflowStatus',
    header: 'Workflow Status',
    width: '10rem',
  },
  {
    id: 'actions',
    accessor: 'id',
    header: 'Actions',
    width: '4.5rem',
    cellRenderer: () => createRowActions(),
  },
]
