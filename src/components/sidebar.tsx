'use client'

import { Box, Button, Flex, Popover } from '@radix-ui/themes'
import { OrganizationButton } from '@/components/auth-buttons'
import { Icons } from '@/components/icons'
import { DashboardIcon, EnvelopeClosedIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function SidebarMenu() {
	const pathname = usePathname()
	const isActive = (path: string) => pathname === path
	const links = [
		{ href: '/dashboard', icon: <DashboardIcon />, label: 'Overview' },
		// { href: '/dashboard/invitations', icon: <EnvelopeClosedIcon />, label: 'Invitations' },
	]
	return (
		<>
			{links.map((link) => (
				<Button
					key={link.href}
					variant="soft"
					color="gray"
					className={cn(
						'justify-start',
						!isActive(link.href) && 'bg-transparent hover:bg-accent-3'
					)}
					asChild
				>
					<Link href={link.href}>
						{link.icon}
						{link.label}
					</Link>
				</Button>
			))}
		</>
	)
}

export function Sidebar() {
	return (
		<Flex
			direction={'column'}
			gap={'2'}
			p={'5'}
			minWidth={'240px'}
			className="border-r bg-gray-1 border-gray-6 hidden md:flex"
		>
			<Box mb={'3'}>
				<Link href="/">
					<Icons.Logo />
				</Link>
			</Box>
			<OrganizationButton afterLeaveOrganizationUrl="/dashboard" />
			<SidebarMenu />
		</Flex>
	)
}

export function MobileSidebar() {
	return (
		<Popover.Root>
			<Popover.Trigger>
				<Button variant="ghost" color="gray">
					<HamburgerMenuIcon />
					Menu
				</Button>
			</Popover.Trigger>
			<Popover.Content>
				<Flex className="flex-col gap-3 flex">
					<Box>
						<Link href="/">
							<Icons.Logo />
						</Link>
					</Box>
					<OrganizationButton />
					<Button variant="soft" color="gray" className="justify-start px-3 py-1 rounded-lg gap-2">
						<DashboardIcon />
						Overview
					</Button>
				</Flex>
			</Popover.Content>
		</Popover.Root>
	)
}
