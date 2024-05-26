import { api } from '@/convex/_generated/api'
import { auth, currentUser } from '@clerk/nextjs/server'
import { Badge, Card, Flex, Grid, Heading } from '@radix-ui/themes'
import { fetchQuery } from 'convex/nextjs'

export async function MentorFormStatus() {
	const session = auth()
	const user = await currentUser()
	const userEmail = user?.primaryEmailAddress?.emailAddress
	if (!session.orgId) return
	const referenceForms = await fetchQuery(api.mentorSignUpForm.getByOrganization, {
		externalOrgId: session.orgId,
	})
	return (
		<Grid columns={'2'} gap={'4'}>
			{referenceForms
				.filter((form) => form.email === userEmail)
				.map((form) => (
					<Card key={form._id}>
						<Flex justify={'between'} align={'center'}>
							<Heading as="h3" size="3">
								{form.referenceEmail}
							</Heading>
							<Badge color={form.isComplete ? 'green' : 'orange'}>
								{form.isComplete ? 'Reference Submitted' : 'Reference Pending'}
							</Badge>
						</Flex>
					</Card>
				))}
		</Grid>
	)
}
