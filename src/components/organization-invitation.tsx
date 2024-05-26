'use client'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Badge, Box, Card, Flex, Skeleton } from '@radix-ui/themes'
import { useQuery } from 'convex/react'

export function OrganizationInvitation({
	orgId,
	invitationId,
}: {
	orgId: Id<'organizations'>
	invitationId: Id<'organizationInvitations'>
}) {
	const org = useQuery(api.organization.getOrganizationByid, { id: orgId })
	const orgInvitation = useQuery(api.organizationInvitation.getInvitationById, {
		id: invitationId,
	})

	return (
		<Card>
			<Flex>
				<Skeleton loading={!org}>
					<Box minHeight={'24px'}>{org?.imageUrl}</Box>
				</Skeleton>
				<Skeleton loading={!org}>
					<Box minHeight={'24px'} minWidth={'100px'}>
						{org?.name}
					</Box>
				</Skeleton>
				<Skeleton loading={!orgInvitation}>
					<Box minHeight={'24px'} minWidth={'70px'} ml={'auto'}>
						<Badge
							size={'2'}
							color={
								orgInvitation?.status === 'accepted'
									? 'jade'
									: orgInvitation?.status === 'revoked'
										? 'red'
										: 'amber'
							}
							className="capitalize"
						>
							{orgInvitation?.status}
						</Badge>
					</Box>
				</Skeleton>
			</Flex>
		</Card>
	)
}
