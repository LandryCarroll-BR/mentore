'use client'

import { api } from '@/convex/_generated/api'
import { Card } from '@radix-ui/themes'
import { useQuery } from 'convex/react'
import Link from 'next/link'
import { ReactNode } from 'react'

export function OrganizationLink({ children }: { children?: ReactNode }) {
	const org = useQuery(api.organization.getCurrentOrganization)

	return (
		<Link href={`organization/${org?._id}`}>
			<Card>{children ? children : org?.name}</Card>
		</Link>
	)
}
