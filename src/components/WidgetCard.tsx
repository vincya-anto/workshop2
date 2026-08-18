import {
  ModusWcButton,
  ModusWcCard,
  ModusWcIcon,
  ModusWcTypography,
} from '@trimble-oss/moduswebcomponents-react'
import type { ReactNode } from 'react'

type WidgetCardProps = {
  title: string
  icon: string
  children: ReactNode
  footer?: string
  onDismiss?: () => void
}

export function WidgetCard({
  title,
  icon,
  children,
  footer,
  onDismiss,
}: WidgetCardProps) {
  return (
    <ModusWcCard bordered padding="compact" customClass="min-w-0">
      <div slot="title" className="flex w-full min-w-0 items-center gap-2">
        <ModusWcIcon name={icon} size="sm" decorative />
        <ModusWcTypography
          hierarchy="h2"
          size="md"
          weight="semibold"
          customClass="!m-0 min-w-0 truncate"
          label={title}
        />
      </div>
      <div slot="actions" hidden={!onDismiss}>
        <ModusWcButton
          variant="borderless"
          color="tertiary"
          shape="square"
          size="xs"
          aria-label={`Dismiss ${title}`}
          onButtonClick={onDismiss}
        >
          <ModusWcIcon name="close" size="xs" decorative />
        </ModusWcButton>
      </div>
      <div className="flex min-w-0 flex-col gap-1">{children}</div>
      <div slot="footer" hidden={!footer}>
        <ModusWcTypography
          hierarchy="p"
          size="sm"
          customClass="!m-0 text-[var(--modus-wc-color-base-content-low-contrast)]"
          label={footer ?? ''}
        />
      </div>
    </ModusWcCard>
  )
}
