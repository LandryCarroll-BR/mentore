import { Flex } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

import '@/styles/globals.css'
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { Authenticated } from '@/components/authenticated'
import { Role } from '@/lib/utils'

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Flex minHeight={'100vh'}>
			<Authenticated allowedRoles={[Role.Admin, Role.Applicant, Role.Mentor, Role.Reference]}>
				<Sidebar />
			</Authenticated>
			<Flex direction={'column'} flexGrow={'1'} p={'5'}>
				<Topbar />
				<div>{children}</div>
			</Flex>
		</Flex>
	)
}
