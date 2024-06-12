'use client'

import { api } from '@/convex/_generated/api'
import { Box, Button, Dialog, Flex } from '@radix-ui/themes'
import { AssessmentForm } from './assessment-form'
import { useQuery } from 'convex/react'

export function Assessments() {
	const assessments = useQuery(api.assessments.findManyByOrgId)
	if (!assessments) return <div>Loading...</div>

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

	if (assessments.length === 0)
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
		<div>
			{JSON.stringify(assessments)}
			{assessmentDialog}
		</div>
	)
}
