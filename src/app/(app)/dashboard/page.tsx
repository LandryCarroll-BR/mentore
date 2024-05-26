import { Authenticated } from '@/components/authenticated'
import { OrganizationLink } from '@/components/organization-link'
import { MentorReferenceform } from '@/components/organization-sign-up-form'
import { SignUpFormStatus } from '@/components/sign-up-form-status'
import { api } from '@/convex/_generated/api'
import { Role } from '@/lib/utils'
import { OrganizationList } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Box, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { fetchMutation, fetchQuery } from 'convex/nextjs'
import { Suspense } from 'react'

export default async function Home() {
	const user = await currentUser()
	const greeting = `Welcome to Mentore${user?.firstName ? ` , ${user.firstName}!` : '!'}`
	const referenceForms = await fetchQuery(api.mentorSignUpForm.getByReferenceEmail, {
		referenceEmail: user?.primaryEmailAddress?.emailAddress ?? '',
	})
	return (
		<main>
			<Container>
				<Authenticated personalOnly>
					<Flex direction={'column'} justify={'center'} align={'center'} gap={'2'}>
						<Heading as="h1">{greeting}</Heading>
						<Text mb={'4'}>To get started, create or join an organization below.</Text>
						<OrganizationList hidePersonal />
					</Flex>
				</Authenticated>

				<Authenticated allowedRoles={[Role.Applicant]}>
					<Heading as="h1">{greeting}</Heading>
					<SignUpFormStatus />
				</Authenticated>

				<Authenticated allowedRoles={[Role.Reference]}>
					<Heading as="h1">{greeting}</Heading>
					<SignUpFormStatus />
					{referenceForms.map((form) => (
						<>
							{!form.isComplete && <MentorReferenceform key={form._id} signUpFormId={form._id} />}
						</>
					))}
				</Authenticated>

				<Authenticated allowedRoles={[Role.Admin]}>
					<Heading as="h1">Overview</Heading>
					<Grid columns={'2'} my={'4'} gap={'4'}>
						<Box>
							<Suspense fallback={'...loading'}>
								<OrganizationLink>Sign Up Form</OrganizationLink>
							</Suspense>
						</Box>
					</Grid>
				</Authenticated>
			</Container>
		</main>
	)
}
