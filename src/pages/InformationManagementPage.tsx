import {
  ModusWcButton,
  ModusWcButtonGroup,
  ModusWcCard,
  ModusWcDivider,
  ModusWcIcon,
  ModusWcSelect,
  ModusWcTable,
  ModusWcTextInput,
  ModusWcToolbar,
  ModusWcTypography,
} from '@trimble-oss/moduswebcomponents-react'
import { useMemo, useState } from 'react'
import { RECORDS } from '../data/records'
import { readInputString } from '../utils/modusFormEvents'
import { RECORD_COLUMNS } from '../utils/recordTableCells'

const VIEW_OPTIONS = [
  { label: 'Default View', value: 'default' },
  { label: 'Issued this week', value: 'issued' },
  { label: 'My records', value: 'mine' },
]

type ViewMode = 'list' | 'grid'

function IconToolButton({
  label,
  name,
}: {
  label: string
  name: string
}) {
  return (
    <ModusWcButton
      aria-label={label}
      color="tertiary"
      shape="square"
      size="sm"
      variant="borderless"
    >
      <ModusWcIcon decorative name={name} size="xs" />
    </ModusWcButton>
  )
}

export function InformationManagementPage() {
  const [search, setSearch] = useState('')
  const [savedView, setSavedView] = useState('default')
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return RECORDS
    return RECORDS.filter((row) =>
      [row.recordName, row.recordDescription, row.author].some((value) =>
        value.toLowerCase().includes(query),
      ),
    )
  }, [search])

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <ModusWcTypography
          hierarchy="h1"
          size="2xl"
          weight="semibold"
          label="Information Management"
        />
        <div className="flex justify-start sm:justify-end">
          <ModusWcButton color="primary" size="sm" variant="filled">
            <ModusWcIcon decorative name="upload" size="xs" />
            Upload
          </ModusWcButton>
        </div>
      </div>

      <ModusWcCard bordered padding="compact">
        <div className="flex min-w-0 flex-col gap-3">
          <ModusWcToolbar>
            <div slot="start" className="toolbar-cluster">
              <IconToolButton label="Saved views" name="view_list" />
              <ModusWcDivider orientation="vertical" responsive={false} />
              <IconToolButton label="Filter records" name="filter" />
              <ModusWcDivider orientation="vertical" responsive={false} />
              <IconToolButton label="Configure columns" name="columns" />
            </div>
            <div slot="end" className="toolbar-cluster">
              <ModusWcTextInput
                aria-label="Search records"
                customClass="toolbar-search"
                includeClear
                includeSearch
                inputId="records-search"
                placeholder="Search by name, type, originator"
                size="sm"
                value={search}
                onInputChange={(event: CustomEvent) => {
                  setSearch(readInputString(event))
                }}
              />
              <IconToolButton label="Print" name="printer" />
              <IconToolButton label="Delete selected records" name="delete" />
              <ModusWcSelect
                aria-label="Saved view"
                inputId="records-view"
                options={VIEW_OPTIONS}
                size="sm"
                value={savedView}
                onInputChange={(event: CustomEvent) => {
                  setSavedView(readInputString(event))
                }}
              />
              <ModusWcButtonGroup
                color="tertiary"
                selectionType="single"
                variant="outlined"
                onButtonSelectionChange={(
                  event: CustomEvent<{ selectedButtons: HTMLElement[] }>,
                ) => {
                  const label = event.detail.selectedButtons[0]?.getAttribute('aria-label')
                  if (label === 'Grid view') setViewMode('grid')
                  if (label === 'List view') setViewMode('list')
                }}
              >
                <ModusWcButton
                  aria-label="List view"
                  pressed={viewMode === 'list'}
                  shape="square"
                  size="sm"
                >
                  <ModusWcIcon decorative name="view_list" size="xs" />
                </ModusWcButton>
                <ModusWcButton
                  aria-label="Grid view"
                  pressed={viewMode === 'grid'}
                  shape="square"
                  size="sm"
                >
                  <ModusWcIcon decorative name="view_grid" size="xs" />
                </ModusWcButton>
              </ModusWcButtonGroup>
            </div>
          </ModusWcToolbar>

          <div
            hidden={viewMode !== 'list'}
            aria-hidden={viewMode !== 'list'}
            className="min-w-0 overflow-x-auto"
          >
            <ModusWcTable
              caption="Information management records"
              columns={RECORD_COLUMNS}
              data={filtered}
              density="compact"
              hover
              mode="simple"
              selectable="multi"
              sortable
              zebra
            />
          </div>

          <div
            hidden={viewMode !== 'grid'}
            aria-hidden={viewMode !== 'grid'}
            className="records-grid"
          >
            {filtered.map((record) => (
              <ModusWcCard key={record.id} bordered={false} padding="compact">
                <div className="flex min-w-0 flex-col gap-1">
                  <ModusWcTypography
                    hierarchy="h2"
                    size="md"
                    weight="semibold"
                    label={record.recordName}
                  />
                  <ModusWcTypography
                    hierarchy="p"
                    size="sm"
                    customClass="text-[var(--modus-wc-color-base-content-low-contrast)]"
                    label={record.recordDescription}
                  />
                  <ModusWcTypography
                    hierarchy="p"
                    size="sm"
                    label={`${record.revision} · ${record.suitability} · ${record.author}`}
                  />
                </div>
              </ModusWcCard>
            ))}
          </div>
        </div>
      </ModusWcCard>
    </div>
  )
}
