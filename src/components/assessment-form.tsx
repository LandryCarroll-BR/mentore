'use client'

import { Form, FormControl, FormField, FormLabel } from '@/components/form'
import { Box, Button, Flex, Grid, Text, TextArea, TextField } from '@radix-ui/themes'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { upsertAssessmentSchema } from '@/convex/utils/validators'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const formSchema = z.object(upsertAssessmentSchema)

type FormSchema = z.infer<typeof formSchema>

export function AssessmentForm() {
	const router = useRouter()
	const createAssessment = useMutation(api.assessments.upsert)
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			passingScore: 0,
		},
	})

	async function onSubmit(values: FormSchema) {
		const assessmentId = await createAssessment(values)
		if (assessmentId) {
			router.push(`/dashboard/assessments/${assessmentId}`)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Grid columns={'2'} gap={'4'}>
					<Box gridColumn={'1/2'} asChild>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<Flex justify={'between'} mb={'1'}>
									<FormLabel asChild>
										<Text size={'2'}>Title</Text>
									</FormLabel>
									<FormControl>
										<TextField.Root {...field} />
									</FormControl>
								</Flex>
							)}
						/>
					</Box>
					<Box gridColumn={'1/2'} asChild>
						<FormField
							control={form.control}
							name="passingScore"
							render={({ field }) => (
								<Flex justify={'between'} mb={'1'}>
									<FormLabel asChild>
										<Text size={'2'}>Passing Score</Text>
									</FormLabel>
									<FormControl>
										<TextField.Root type="number" {...field} />
									</FormControl>
								</Flex>
							)}
						/>
					</Box>
					<Box gridColumn={'1/3'} asChild>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<Flex justify={'between'} mb={'1'}>
									<FormLabel asChild>
										<Text size={'2'}>Description</Text>
									</FormLabel>
									<FormControl>
										<TextArea {...field} />
									</FormControl>
								</Flex>
							)}
						/>
					</Box>
					<Box gridColumn={'1/3'} asChild>
						<Button type="submit" size={'3'} loading={form.formState.isSubmitting}>
							Create Assessment
						</Button>
					</Box>
				</Grid>
			</form>
		</Form>
	)
}
