import { Button, Flex } from '@radix-ui/themes'
import { OrganizationButton } from '@/components/auth-buttons'
import { Icons } from '@/components/icons'
import { DashboardIcon } from '@radix-ui/react-icons'

export function Sidebar() {
	return (
		<Flex
			direction={'column'}
			gap={'4'}
			p={'5'}
			minWidth={'240px'}
			className="border-r bg-sage-1 border-sage-6"
		>
			<Icons.Logo />
			<OrganizationButton />
			<Button variant="soft" color="gray" className="justify-start">
				<DashboardIcon />
				Overview
			</Button>
		</Flex>
	)
}
