'use client'

import React from 'react'
import * as Form from '@radix-ui/react-form'
import {
	Box,
	Button,
	Callout,
	Flex,
	Grid,
	Heading,
	Text,
	TextArea,
	TextField,
} from '@radix-ui/themes'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { sendInvitation, updateSignUpForm } from '@/actions'
import { useAction } from 'next-safe-action/hooks'
import { organizationSchema, updateMentorSignUpFormSchema } from '@/actions/schemas'
import { useUser } from '@clerk/clerk-react'

const OrganizationSignUpform = ({ organizationId }: { organizationId: Id<'organizations'> }) => {
	const { execute, status } = useAction(sendInvitation)
	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = Object.fromEntries(new FormData(event.currentTarget))
		const payload = { ...data, organizationId }
		const parsedData = organizationSchema.parse(payload)
		execute({ ...parsedData, organizationId })
	}
	return (
		<Form.Root onSubmit={onSubmit}>
			<Grid columns={'2'} gap={'4'}>
				{status === 'hasSucceeded' && (
					<Box gridColumn={'1/3'} minHeight={'520px'}>
						<Heading as="h2" size={'4'} mb={'6'} align={'center'} wrap={'balance'}>
							Thank you for your interest in becoming a mentor.
						</Heading>
						<Text>
							<ol className="list-decimal space-y-7">
								<li className="ml-4">
									<strong>Confirmation Email:</strong> You will receive an email shortly with an
									invitation to join our organization. Please follow the instructions in the email
									to set up your account.
								</li>
								<li className="ml-4">
									<strong>Check Your Application Status:</strong> Once logged in, you can easily
									check the status of your application and receive updates directly through our
									platform.
								</li>
								<li className="ml-4">
									<strong>Reference Invitation:</strong> We have also sent an invitation to your
									reference to join our community. They will be prompted to create an account and
									complete a reference form to support your application.
								</li>
							</ol>
						</Text>
						<Callout.Root mt={'7'} size={'3'}>
							<Callout.Text>
								<Flex direction={'column'} gap={'3'}>
									<Heading as="h3" size={'3'}>
										Get Started Right Away!
									</Heading>
									<Text mb={'2'}>
										Ready to dive in? Log in to your account and begin exploring what&apos;s next.
										Stay connected, stay informed, and prepare to make a difference!
									</Text>
									<Button>Log in to your account</Button>
								</Flex>
							</Callout.Text>
						</Callout.Root>
					</Box>
				)}

				{status !== 'hasSucceeded' && (
					<>
						<Box gridColumn={'1/2'} asChild>
							<Form.Field name="firstName">
								<Flex justify={'between'} mb={'1'}>
									<Form.Label asChild>
										<Text size={'2'}>First Name</Text>
									</Form.Label>
								</Flex>
								<Form.Control asChild>
									<TextField.Root />
								</Form.Control>
							</Form.Field>
						</Box>
						<Box gridColumn={'2/3'} asChild>
							<Form.Field name="lastName">
								<Flex justify={'between'} mb={'1'}>
									<Form.Label asChild>
										<Text size={'2'}>Last Name</Text>
									</Form.Label>
								</Flex>
								<Form.Control asChild>
									<TextField.Root />
								</Form.Control>
							</Form.Field>
						</Box>
						<Box gridColumn={'1/3'} asChild>
							<Form.Field name="email">
								<Flex justify={'between'} mb={'1'}>
									<Form.Label asChild>
										<Text size={'2'}>Email*</Text>
									</Form.Label>
									<Form.Message match="valueMissing" className="text-red-11">
										Please enter your email
									</Form.Message>
									<Form.Message match="typeMismatch" className="text-red-11">
										Please provide a valid email
									</Form.Message>
								</Flex>
								<Form.Control asChild>
									<TextField.Root type="email" required />
								</Form.Control>
							</Form.Field>
						</Box>
						<Box gridColumn={'1/3'} asChild>
							<Form.Field name="message">
								<Flex justify={'between'} mb={'1'}>
									<Form.Label asChild>
										<Text size={'2'}>Tell us why you want to be a mentor?*</Text>
									</Form.Label>
									<Form.Message match="valueMissing" className="text-red-11">
										Please enter a question
									</Form.Message>
								</Flex>
								<Form.Control asChild>
									<TextArea required />
								</Form.Control>
							</Form.Field>
						</Box>
						<Box gridColumn={'1/3'} asChild>
							<Form.Field name="referenceEmail">
								<Flex justify={'between'} mb={'1'}>
									<Form.Label asChild>
										<Text size={'2'}>Reference Email*</Text>
									</Form.Label>
									<Form.Message match="valueMissing" className="text-red-11">
										Please enter an email
									</Form.Message>
									<Form.Message match="typeMismatch" className="text-red-11">
										Please provide a valid email
									</Form.Message>
								</Flex>
								<Form.Control asChild>
									<TextField.Root type="email" required />
								</Form.Control>
							</Form.Field>
						</Box>
						<Box gridColumn={'1/3'} asChild>
							<Callout.Root size={'1'}>
								<Callout.Text>
									Please enter the email address of someone who can provide a professional or
									personal recommendation for you. Choose someone who knows you well and can speak
									to your abilities and character, such as a former instructor, colleague, or
									community leader.
								</Callout.Text>
							</Callout.Root>
						</Box>
						<Box gridColumn={'1/3'} asChild>
							<Callout.Root size={'1'} color="gray">
								<Callout.Text>* Required field</Callout.Text>
							</Callout.Root>
						</Box>

						<Box gridColumn={'1/3'} asChild>
							<Form.Submit asChild>
								<Button size={'3'} loading={status === 'executing'}>
									Sign Up
								</Button>
							</Form.Submit>
						</Box>
					</>
				)}
			</Grid>
		</Form.Root>
	)
}

const MentorReferenceform = ({ form }: { form: Doc<'mentorSignUpForms'> }) => {
	const user = useUser()
	const { execute, status } = useAction(updateSignUpForm)
	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!user.user?.primaryEmailAddress?.emailAddress) return
		const data = Object.fromEntries(new FormData(event.currentTarget))
		const payload = { ...data, signUpFormId: form._id }
		console.log(payload)
		const parsedData = updateMentorSignUpFormSchema.parse(payload)
		execute({ ...parsedData })
	}
	return (
		<Form.Root onSubmit={onSubmit}>
			<Grid columns={'1'} gap={'4'}>
				{status === 'hasSucceeded' && (
					<Box gridColumn={'1/3'}>
						<Callout.Root>
							<Heading as="h2" size={'4'} align={'center'} wrap={'balance'}>
								Thank you for your submitting your reference.
							</Heading>
						</Callout.Root>
					</Box>
				)}

				{status !== 'hasSucceeded' && (
					<>
						<Box gridColumn={'1/2'} asChild>
							<Form.Field name="referenceResponse">
								<Flex justify={'between'} mb={'1'}>
									<Form.Label asChild>
										<Text size={'2'}>Reference Response*</Text>
									</Form.Label>
								</Flex>
								<Form.Control asChild>
									<TextArea required />
								</Form.Control>
							</Form.Field>
						</Box>
						<Box gridColumn={'1/3'} asChild>
							<Callout.Root size={'1'} color="gray">
								<Callout.Text>* Required field</Callout.Text>
							</Callout.Root>
						</Box>
						<Box gridColumn={'1/3'} asChild>
							<Form.Submit asChild>
								<Button size={'3'} loading={status === 'executing'}>
									Submit
								</Button>
							</Form.Submit>
						</Box>
					</>
				)}
			</Grid>
		</Form.Root>
	)
}

export { OrganizationSignUpform, MentorReferenceform }
