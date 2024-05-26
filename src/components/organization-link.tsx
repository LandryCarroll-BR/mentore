import { api } from '@/convex/_generated/api'
import { auth } from '@clerk/nextjs/server'
import { Card } from '@radix-ui/themes'
import { fetchQuery } from 'convex/nextjs'
import Link from 'next/link'
import { ReactNode } from 'react'

export async function OrganizationLink({ children }: { children?: ReactNode }) {
	const user = auth()

	if (!user?.orgId) return
	const org = await fetchQuery(api.organization.getByExternalId, {
		externalId: user.orgId,
	})

	return (
		<Link href={`organization/${org?._id}`}>
			<Card>{children ? children : org?.name}</Card>
		</Link>
	)
}
