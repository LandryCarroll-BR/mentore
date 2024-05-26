import { Authenticated } from '@/components/authenticated'
import { OrganizationLink } from '@/components/organization-link'
import { MentorReferenceform } from '@/components/organization-sign-up-form'
import { MentorFormStatus } from '@/components/mentor-form-status'
import { api } from '@/convex/_generated/api'
import { Role } from '@/lib/utils'
import { OrganizationList } from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server'
import { CheckIcon } from '@radix-ui/react-icons'
import {
	Badge,
	Box,
	Button,
	Card,
	Container,
	Dialog,
	Flex,
	Grid,
	Heading,
	Text,
} from '@radix-ui/themes'
import { Suspense } from 'react'
import { MentorReferenceForms } from '@/components/mentor-reference-forms'

export default async function Home() {
	const user = await currentUser()
	const greeting = `Welcome to Mentore${user?.firstName ? ` , ${user.firstName}!` : '!'}`

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
					<Heading as="h1" mb={'4'}>
						{greeting}
					</Heading>
					<Heading as="h2" size="2" mb={'2'}>
						Reference Status
					</Heading>
					<Suspense>
						<MentorFormStatus />
					</Suspense>
				</Authenticated>

				<Authenticated allowedRoles={[Role.Reference]}>
					<Heading as="h1" mb={'4'}>
						{greeting}
					</Heading>
					<Heading as="h2" size="2" mb={'2'}>
						References to Submit
					</Heading>
					<Suspense>
						<MentorReferenceForms byCurrentUserEmail />
					</Suspense>
				</Authenticated>

				<Authenticated allowedRoles={[Role.Admin]}>
					<Heading as="h1">Overview</Heading>
					<Grid columns={'2'} my={'4'} gap={'4'}>
						<Box>
							<Suspense>
								<OrganizationLink>Sign Up Form</OrganizationLink>
							</Suspense>
						</Box>
					</Grid>
				</Authenticated>
			</Container>
		</main>
	)
}
