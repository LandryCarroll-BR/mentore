import { Box, Button, Flex, Theme } from '@radix-ui/themes'
import { OrganizationButton } from '@/components/auth-buttons'
import { Icons } from '@/components/icons'
import { DashboardIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './sheet'
import { Icon } from '@radix-ui/themes/src/components/callout.jsx'
import Link from 'next/link'

export function SidebarMenu() {
	return (
		<Button variant="soft" color="gray" className="justify-start">
			<DashboardIcon />
			Overview
		</Button>
	)
}

export function Sidebar() {
	return (
		<Flex
			direction={'column'}
			gap={'4'}
			p={'5'}
			minWidth={'240px'}
			className="border-r bg-sage-1 border-sage-6 hidden md:flex"
		>
			<Link href="/">
				<Icons.Logo />
			</Link>
			<SidebarMenu />
		</Flex>
	)
}

export function MobileSidebar() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" color="gray">
					<HamburgerMenuIcon />
					Menu
				</Button>
			</SheetTrigger>
			<SheetContent side={'left'}>
				<Box className="my-4">
					<Link href="/">
						<Icons.Logo />
					</Link>
				</Box>
				<Button variant="soft" color="gray" className="justify-start px-3 py-1 rounded-lg gap-2">
					<DashboardIcon />
					Overview
				</Button>
			</SheetContent>
		</Sheet>
	)
}
