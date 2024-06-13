'use client'

import { api } from '@/convex/_generated/api'
import { Badge, Box, Card, DataList, Grid, Text } from '@radix-ui/themes'
import { useQuery } from 'convex/react'

export function MentorFormStatus() {
	const referenceForms = useQuery(api.mentorSignUpForm.getByOrganization)
	if (!referenceForms) return null
	return (
		<Grid columns={{ initial: '1', md: '2' }} gap={'4'}>
			{referenceForms.map((form) => (
				<Card key={form._id}>
					<Box mb={'2'}>
						<Text size="3" weight={'bold'}>
							Mentor Application
						</Text>
					</Box>
					<DataList.Root>
						<DataList.Item>
							<DataList.Label>Name</DataList.Label>
							<DataList.Value>
								{form.firstName} {form.lastName}
							</DataList.Value>
						</DataList.Item>
						<DataList.Item>
							<DataList.Label>Reference</DataList.Label>
							<DataList.Value>{form.referenceEmail}</DataList.Value>
						</DataList.Item>
						<DataList.Item>
							<DataList.Label>Status</DataList.Label>
							<DataList.Value>
								<Badge color={form.isComplete ? 'green' : 'orange'}>
									{form.isComplete ? 'Complete' : 'Pending'}
								</Badge>
							</DataList.Value>
						</DataList.Item>
					</DataList.Root>
				</Card>
			))}
		</Grid>
	)
}
