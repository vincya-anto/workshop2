import { ModusWcCard, ModusWcTypography } from '@trimble-oss/moduswebcomponents-react'
import { PAGE_COPY, type NavId } from '../data/nav.ts'

type SectionPageProps = {
  navId: NavId
}

export function SectionPage({ navId }: SectionPageProps) {
  const copy = PAGE_COPY[navId]

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div>
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
      <ModusWcCard bordered padding="compact">
        <ModusWcTypography
          hierarchy="p"
          size="md"
          customClass="!m-0"
          label={`${copy.title} records for this project will appear here.`}
        />
      </ModusWcCard>
    </div>
  )
}
