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
				<Authenticated allowedRoles={[Role.Admin]}>
					<Heading as="h1" mb={'4'}>
						Invitations
					</Heading>
					<Suspense>
						<MentorReferenceForms />
					</Suspense>
				</Authenticated>
			</Container>
		</main>
	)
}
