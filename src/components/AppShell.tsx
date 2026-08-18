import {
  ModusWcAlert,
  ModusWcButton,
  ModusWcDropdownMenu,
  ModusWcIcon,
  ModusWcMenu,
  ModusWcMenuItem,
  ModusWcNavbar,
  ModusWcSideNavigation,
  ModusWcThemeSwitcher,
  ModusWcToast,
  ModusWcTypography,
} from '@trimble-oss/moduswebcomponents-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  APP_SHELL_RAIL_EXPANDED_CLASS,
  APP_SHELL_ROOT_CLASS,
  NAVBAR_WIDE_MIN_PX,
  PUSH_LAYOUT_MIN_PX,
  SIDE_NAV_MAX_WIDTH,
  SIDE_NAV_MIN_WIDTH,
} from '../constants/shellLayout'
import { FOOTER_NAV, PRIMARY_NAV, PROJECTS, type NavId, type NavItem } from '../data/nav'
import { useMinWidth } from '../hooks/useMediaQuery'
import { DashboardPage } from './DashboardPage'
import { AssignmentsPanel } from './AssignmentsPanel'
import { InformationManagementPage } from '../pages/InformationManagementPage'
import { SectionPage } from '../pages/SectionPage'

const XL_MIN_PX = 1280

const USER_CARD = {
  avatarAlt: 'Vincy Kumar',
  email: 'vincy.kumar@trimble.com',
  name: 'Vincy Kumar',
}

type ToastItem = { id: string; title: string }
type NavbarHost = HTMLElement & { mainMenuOpen: boolean }

function railWrapperClass(isPushLayout: boolean, expanded: boolean): string {
  if (!isPushLayout) {
    return expanded
      ? 'side-rail-wrapper side-rail-wrapper--overlay-open'
      : 'side-rail-wrapper side-rail-wrapper--overlay-closed'
  }
  return expanded
    ? 'side-rail-wrapper side-rail-wrapper--push-expanded'
    : 'side-rail-wrapper side-rail-wrapper--push-collapsed'
}

function MenuRow({
  item,
  selectedNav,
  onNavigate,
}: {
  item: NavItem
  selectedNav: NavId
  onNavigate: (id: NavId) => void
}) {
  const childSelected = item.children?.some((child) => child.id === selectedNav) ?? false

  return (
    <ModusWcMenuItem
      label={item.label}
      value={item.id}
      size="md"
      selected={selectedNav === item.id || childSelected}
      hasSubmenu={Boolean(item.children)}
      onItemSelect={(event: CustomEvent<{ value: string }>) => {
        if (event.detail.value !== item.id) return
        if (item.children) return
        onNavigate(item.id)
      }}
    >
      <ModusWcIcon slot="start-icon" name={item.icon} size="md" decorative />
      {item.children?.map((child) => (
        <ModusWcMenuItem
          key={child.id}
          label={child.label}
          value={child.id}
          size="md"
          selected={selectedNav === child.id}
          onItemSelect={(event: CustomEvent<{ value: string }>) => {
            if (event.detail.value === child.id) onNavigate(child.id)
          }}
        >
          <ModusWcIcon slot="start-icon" name={child.icon} size="md" decorative />
        </ModusWcMenuItem>
      ))}
    </ModusWcMenuItem>
  )
}

export function AppShell() {
  const isPushLayout = useMinWidth(PUSH_LAYOUT_MIN_PX)
  const isNavbarWide = useMinWidth(NAVBAR_WIDE_MIN_PX)
  const isXl = useMinWidth(XL_MIN_PX)
  const [sideNavExpanded, setSideNavExpanded] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(min-width: ${XL_MIN_PX}px)`).matches,
  )
  const [selectedNav, setSelectedNav] = useState<NavId>('home')
  const [projectMenuOpen, setProjectMenuOpen] = useState(false)
  const [projectName, setProjectName] = useState<string>(PROJECTS[0].label)
  const [assignmentsOpen, setAssignmentsOpen] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(min-width: ${XL_MIN_PX}px)`).matches,
  )
  const [assignedTo, setAssignedTo] = useState('me')
  const [company, setCompany] = useState('mine')
  const [recordType, setRecordType] = useState('all')
  const [status, setStatus] = useState('all')
  const [dueDate, setDueDate] = useState('all')
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [mainEl, setMainEl] = useState<HTMLElement | null>(null)

  const navbarWrapRef = useRef<HTMLDivElement>(null)
  const navbarRef = useRef<NavbarHost | null>(null)
  const railWrapRef = useRef<HTMLDivElement>(null)

  const overlayClosed = !isPushLayout && !sideNavExpanded
  const mainMenuOpen = isPushLayout ? false : sideNavExpanded

  useEffect(() => {
    setSideNavExpanded(isXl)
  }, [isXl])

  useEffect(() => {
    setAssignmentsOpen(isXl)
  }, [isXl])

  useEffect(() => {
    if (!isPushLayout) setSideNavExpanded(false)
  }, [selectedNav, isPushLayout])

  useLayoutEffect(() => {
    const el = navbarWrapRef.current
    if (!el) return
    const apply = () => {
      const height = el.getBoundingClientRect().height
      document.documentElement.style.setProperty('--app-navbar-height', `${height}px`)
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const main = document.getElementById('main-content')
    if (!main) return
    if (!isPushLayout) {
      main.style.removeProperty('margin-left')
      return
    }
    const margin = sideNavExpanded ? SIDE_NAV_MAX_WIDTH : SIDE_NAV_MIN_WIDTH
    main.style.marginLeft = margin
    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        main.style.marginLeft = margin
      })
    })
    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [isPushLayout, sideNavExpanded])

  useLayoutEffect(() => {
    const wrap = railWrapRef.current
    if (!wrap) return
    if (overlayClosed && wrap.contains(document.activeElement)) {
      document.getElementById('main-content')?.focus()
    }
    if (overlayClosed) wrap.setAttribute('inert', '')
    else wrap.removeAttribute('inert')
  }, [overlayClosed])

  useEffect(() => {
    const host = navbarRef.current
    if (!host) return
    const timer = window.setTimeout(() => {
      host.mainMenuOpen = isPushLayout ? false : sideNavExpanded
    }, 0)
    return () => window.clearTimeout(timer)
  }, [selectedNav, isPushLayout, sideNavExpanded])

  const pushToast = (title: string) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, title }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id))
    }, 4000)
  }

  const navigate = (id: NavId) => {
    setSelectedNav(id)
    if (!isPushLayout) setSideNavExpanded(false)
  }

  const shellClass = [
    APP_SHELL_ROOT_CLASS,
    isPushLayout && sideNavExpanded ? APP_SHELL_RAIL_EXPANDED_CLASS : '',
  ]
    .filter(Boolean)
    .join(' ')

  const visibility = isNavbarWide
    ? {
        ai: false,
        apps: true,
        help: true,
        logo: true,
        mainMenu: true,
        notifications: true,
        search: true,
        searchInput: false,
        user: true,
      }
    : {
        ai: false,
        apps: false,
        help: false,
        logo: true,
        mainMenu: true,
        notifications: false,
        search: false,
        searchInput: false,
        user: true,
      }

  return (
    <div className={shellClass}>
      <a className="sr-only focus:not-sr-only" href="#main-content">
        Skip to main content
      </a>
      <div ref={navbarWrapRef} className="flex-shrink-0">
        <ModusWcNavbar
          ref={(element) => {
            navbarRef.current = element as NavbarHost | null
          }}
          condensed={!isNavbarWide}
          customClass="sticky top-0 z-[120] flex-shrink-0"
          logoName="projectsight"
          mainMenuOpen={mainMenuOpen}
          userCard={USER_CARD}
          visibility={visibility}
          onMainMenuOpenChange={(event: CustomEvent<boolean>) => {
            if (isPushLayout) {
              setSideNavExpanded((open) => !open)
              return
            }
            setSideNavExpanded(Boolean(event.detail))
          }}
          onHelpClick={() => pushToast('Help opens the ProjectSight support center.')}
          onSearchChange={(event: CustomEvent<{ value: string }>) => {
            if (event.detail.value) pushToast(`Searching for “${event.detail.value}”.`)
          }}
          onSignOutClick={() => pushToast('Sign out is not wired in this preview.')}
        >
          <div
            slot="center"
            hidden={!isNavbarWide}
            className={isNavbarWide ? 'flex min-w-0 items-center' : undefined}
          >
            <ModusWcDropdownMenu
              buttonAriaLabel="Select project"
              buttonColor="tertiary"
              buttonSize="md"
              buttonVariant="outlined"
              menuPlacement="bottom-start"
              menuVisible={projectMenuOpen}
              onMenuVisibilityChange={(event: CustomEvent<{ isVisible: boolean }>) => {
                setProjectMenuOpen(Boolean(event.detail?.isVisible))
              }}
            >
              <div slot="button" className="flex items-center gap-1">
                <ModusWcTypography hierarchy="p" size="md" label={projectName} />
                <ModusWcIcon decorative name="expand_more" size="sm" />
              </div>
              <div slot="menu">
                {PROJECTS.map((project) => (
                  <ModusWcMenuItem
                    key={project.value}
                    label={project.label}
                    selected={project.label === projectName}
                    value={project.value}
                    onItemSelect={(event: CustomEvent<{ value: string }>) => {
                      const next = PROJECTS.find((item) => item.value === event.detail.value)
                      if (next) setProjectName(next.label)
                      setProjectMenuOpen(false)
                    }}
                  />
                ))}
              </div>
            </ModusWcDropdownMenu>
          </div>
          <div slot="end" className="flex items-center gap-2">
            <ModusWcButton
              variant="outlined"
              color="tertiary"
              size="md"
              onButtonClick={() => pushToast('Invite members is not wired in this preview.')}
            >
              <ModusWcIcon name="people_add" size="sm" decorative />
              Invite members
            </ModusWcButton>
            <ModusWcButton
              variant="borderless"
              color="tertiary"
              shape="square"
              size="md"
              aria-label="Settings"
              onButtonClick={() => pushToast('Settings is not wired in this preview.')}
            >
              <ModusWcIcon name="settings" size="sm" decorative />
            </ModusWcButton>
            <ModusWcThemeSwitcher aria-label="Theme toggle" />
          </div>
          <div slot="apps" className="flex flex-col gap-2 p-3">
            <ModusWcTypography
              hierarchy="p"
              size="md"
              weight="semibold"
              customClass="!m-0"
              label="Trimble apps"
            />
            <ModusWcTypography
              hierarchy="p"
              size="sm"
              customClass="!m-0 text-[var(--modus-wc-color-base-content-low-contrast)]"
              label="ProjectSight, Connect, and Viewpoint apps appear here."
            />
          </div>
          <div slot="notifications" className="flex flex-col gap-2 p-3">
            <ModusWcTypography
              hierarchy="p"
              size="md"
              weight="semibold"
              customClass="!m-0"
              label="Notifications"
            />
            <ModusWcTypography
              hierarchy="p"
              size="sm"
              customClass="!m-0"
              label="RFI-1042 is due today."
            />
            <ModusWcTypography
              hierarchy="p"
              size="sm"
              customClass="!m-0"
              label="Safety walk checklist assigned to you."
            />
          </div>
        </ModusWcNavbar>
      </div>

      <div className="app-body-row">
        <div ref={railWrapRef} className={railWrapperClass(isPushLayout, sideNavExpanded)}>
          <ModusWcSideNavigation
            key={isPushLayout ? 'push' : 'overlay'}
            collapseOnClickOutside={!isPushLayout}
            expanded={sideNavExpanded}
            maxWidth={SIDE_NAV_MAX_WIDTH}
            mode={isPushLayout ? 'push' : 'overlay'}
            targetContent="#main-content"
            onExpandedChange={(event: CustomEvent<boolean>) => {
              setSideNavExpanded(Boolean(event.detail))
            }}
          >
            <div className="project-menu">
              <ModusWcTypography
                hierarchy="p"
                size="sm"
                weight="semibold"
                customClass="project-menu-label"
                label="Project menu"
              />
              <ModusWcMenu customClass="project-menu-grow" size="md" aria-label="Project menu">
                {PRIMARY_NAV.map((item) => (
                  <MenuRow
                    key={item.id}
                    item={item}
                    selectedNav={selectedNav}
                    onNavigate={navigate}
                  />
                ))}
              </ModusWcMenu>
              <ModusWcMenu size="md" aria-label="Project switcher">
                <MenuRow item={FOOTER_NAV} selectedNav={selectedNav} onNavigate={navigate} />
              </ModusWcMenu>
            </div>
          </ModusWcSideNavigation>
        </div>

        <main id="main-content" tabIndex={-1} ref={setMainEl}>
          <div className="mx-auto min-w-0 max-w-7xl px-4 py-4 md:px-6">
            {selectedNav === 'home' ? (
              <DashboardPage
                assignmentsOpen={assignmentsOpen}
                onToggleAssignments={() => setAssignmentsOpen((open) => !open)}
                onToast={pushToast}
                assignedTo={assignedTo}
                company={company}
                recordType={recordType}
                status={status}
                dueDate={dueDate}
              />
            ) : selectedNav === 'information' ? (
              <InformationManagementPage />
            ) : (
              <SectionPage navId={selectedNav} />
            )}
          </div>
        </main>

        <AssignmentsPanel
          expanded={assignmentsOpen}
          pushContent={isPushLayout}
          target={mainEl}
          assignedTo={assignedTo}
          company={company}
          recordType={recordType}
          status={status}
          dueDate={dueDate}
          onAssignedTo={setAssignedTo}
          onCompany={setCompany}
          onRecordType={setRecordType}
          onStatus={setStatus}
          onDueDate={setDueDate}
          onClose={() => setAssignmentsOpen(false)}
        />
      </div>

      {toasts.map((toast) => (
        <ModusWcToast key={toast.id} position="top-end" delay={4000}>
          <ModusWcAlert variant="info" alertTitle={toast.title} dismissible />
        </ModusWcToast>
      ))}

      <div className="chat-fab">
        <ModusWcButton
          variant="filled"
          color="primary"
          shape="circle"
          size="md"
          aria-label="Open chat"
          onButtonClick={() => pushToast('Chat is not wired in this preview.')}
        >
          <ModusWcIcon name="chat" size="sm" decorative />
        </ModusWcButton>
      </div>
    </div>
  )
}
