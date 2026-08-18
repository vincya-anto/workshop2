import {
  ModusWcButton,
  ModusWcCard,
  ModusWcIcon,
  ModusWcTypography,
} from '@trimble-oss/moduswebcomponents-react'

const FIELDS = [
  { label: 'Address', value: '1200 Harbor Blvd, Oakland, CA' },
  { label: 'Building type', value: 'Commercial' },
  { label: 'Construction type', value: 'Type I-B' },
  { label: 'Owner', value: 'Harbor Development LLC' },
] as const

type ProjectHeaderCardProps = {
  onAction: (title: string) => void
}

export function ProjectHeaderCard({ onAction }: ProjectHeaderCardProps) {
  return (
    <ModusWcCard bordered padding="compact" customClass="project-header-card">
      <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center">
        <div className="project-header-figure" aria-hidden="true">
          <ModusWcIcon name="buildings" size="lg" decorative />
        </div>
        <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {FIELDS.map((field) => (
            <div key={field.label} className="min-w-0">
              <ModusWcTypography
                hierarchy="p"
                size="sm"
                customClass="!m-0 text-[var(--modus-wc-color-base-content-low-contrast)]"
                label={field.label}
              />
              <ModusWcTypography
                hierarchy="p"
                size="md"
                weight="semibold"
                customClass="!m-0"
                label={field.value}
              />
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <ModusWcButton
            variant="borderless"
            color="tertiary"
            shape="square"
            size="sm"
            aria-label="Edit project details"
            onButtonClick={() => onAction('Project details editor is not wired in this preview.')}
          >
            <ModusWcIcon name="pencil" size="xs" decorative />
          </ModusWcButton>
          <ModusWcButton
            variant="borderless"
            color="tertiary"
            shape="square"
            size="sm"
            aria-label="View project team"
            onButtonClick={() => onAction('Team directory is not wired in this preview.')}
          >
            <ModusWcIcon name="people_group" size="xs" decorative />
          </ModusWcButton>
        </div>
      </div>
    </ModusWcCard>
  )
}
