import { OrganizationInvitation } from '@/components/organization-invitation'
import { api } from '@/convex/_generated/api'
import { currentUser } from '@clerk/nextjs/server'
import { Box, Container, Grid, Heading } from '@radix-ui/themes'
import { fetchQuery } from 'convex/nextjs'

export default async function Home() {
	const user = await currentUser()

	if (!user?.primaryEmailAddress) return
	const invitations = await fetchQuery(api.organizationInvitation.getInvitationsByUserEmail, {
		email: user.primaryEmailAddress.emailAddress,
	})

	return (
		<main>
			<Container>
				<Heading as="h1">Invitations</Heading>
				<Grid columns={'2'} my={'4'} gap={'4'}>
					{invitations?.map((invitation) => (
						<Box key={invitation._id}>
							<OrganizationInvitation orgId={invitation.orgId} invitationId={invitation._id} />
						</Box>
					))}
				</Grid>
			</Container>
		</main>
	)
}
