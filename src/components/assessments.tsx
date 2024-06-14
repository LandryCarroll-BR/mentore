'use client'

import { api } from '@/convex/_generated/api'
import { Box, Button, Card, Dialog, Flex, Grid, Heading, Link, Text } from '@radix-ui/themes'
import { AssessmentForm } from './assessment-form'
import { useQuery } from 'convex/react'

export function Assessments() {
	const assessments = useQuery(api.assessments.findManyByOrgId)

	const assessmentDialog = (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button>Create New Assessment</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<AssessmentForm />
			</Dialog.Content>
		</Dialog.Root>
	)

	if (assessments?.length === 0)
		return (
			<Flex
				className="border-2 border-dashed border-gray-5 rounded-lg"
				p={'7'}
				justify={'center'}
				direction={'column'}
				align={'center'}
				gap={'4'}
			>
				<Box>No assessments found</Box>
				{assessmentDialog}
			</Flex>
		)

	return (
		<Grid gap={'3'} columns={'3'}>
			{assessments?.map((assessment) => (
				<Box key={assessment._id} maxWidth="350px">
					<Card asChild>
						<Link href={`/dashboard/assessments/${assessment._id}`}>
							<Text as="div" size="2" weight="bold">
								{assessment.title}
							</Text>
							<Text as="div" color="gray" size="2">
								{assessment.description}
							</Text>
						</Link>
					</Card>
				</Box>
			))}
		</Grid>
	)
}
