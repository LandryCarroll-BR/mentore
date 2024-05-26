import { api } from '@/convex/_generated/api'
import { auth, currentUser } from '@clerk/nextjs/server'
import { CheckIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { Dialog, Button, Card, Flex, Grid, Heading, Text, DataList, Badge } from '@radix-ui/themes'
import { fetchQuery } from 'convex/nextjs'
import { MentorReferenceform } from './organization-sign-up-form'
import { Authenticated } from './authenticated'
import { Role } from '@/lib/utils'

export async function MentorReferenceForms({
	byCurrentUserEmail,
}: {
	byCurrentUserEmail?: boolean
}) {
	const session = auth()
	const user = await currentUser()
	const userEmail = user?.primaryEmailAddress?.emailAddress
	if (!session.orgId || !userEmail) return
	const referenceForms = await fetchQuery(api.mentorSignUpForm.getByOrganization, {
		externalOrgId: session.orgId,
	})
	return (
		<Grid columns={{ initial: '1', md: '2' }} gap={'4'}>
			{referenceForms
				.filter((form) => (byCurrentUserEmail ? form.referenceEmail === userEmail : true))
				.map((form) => (
					<Card key={form._id}>
						<Flex
							direction={{ initial: 'column', md: 'row' }}
							justify={'between'}
							align={{ initial: 'start', md: 'center' }}
							gap={'3'}
						>
							<Flex direction={'column'}>
								<Heading as="h3" size="3">
									{form.firstName} {form.lastName}
								</Heading>
							</Flex>
							<Dialog.Root>
								<Authenticated allowedRoles={[Role.Reference]}>
									<Dialog.Trigger>
										<Button disabled={form.isComplete}>
											{form.isComplete && <CheckIcon />}
											{form.isComplete ? 'Reference Submitted' : 'Submit Reference'}
										</Button>
									</Dialog.Trigger>
								</Authenticated>
								<Authenticated allowedRoles={[Role.Admin]}>
									<Dialog.Trigger>
										<Button>
											{form.isComplete && <CheckIcon />}
											View Application
										</Button>
									</Dialog.Trigger>
								</Authenticated>

								<Authenticated allowedRoles={[Role.Admin]}>
									<Dialog.Content>
										<Dialog.Title>{form.firstName}</Dialog.Title>
										<DataList.Root>
											<DataList.Item>
												<DataList.Label>Email</DataList.Label>
												<DataList.Value>{form.email}</DataList.Value>
											</DataList.Item>
											<DataList.Item>
												<DataList.Label>Reference Email</DataList.Label>
												<DataList.Value>{form.referenceEmail}</DataList.Value>
											</DataList.Item>
											<DataList.Item>
												<DataList.Label>Date Submitted</DataList.Label>
												<DataList.Value>
													{new Date(form._creationTime).toLocaleDateString()}
												</DataList.Value>
											</DataList.Item>
											<DataList.Item>
												<DataList.Label>Reference Response</DataList.Label>
												<DataList.Value>{form.referenceResponse}</DataList.Value>
											</DataList.Item>
										</DataList.Root>
									</Dialog.Content>
								</Authenticated>

								<Authenticated allowedRoles={[Role.Reference]}>
									<Dialog.Content maxWidth="450px">
										<Dialog.Title>Submit Reference</Dialog.Title>
										<Dialog.Description size="2" mb="4">
											Please submit your reference for {form.firstName}.
										</Dialog.Description>
										<MentorReferenceform form={form} />
									</Dialog.Content>
								</Authenticated>
							</Dialog.Root>
						</Flex>
					</Card>
				))}
		</Grid>
	)
}
