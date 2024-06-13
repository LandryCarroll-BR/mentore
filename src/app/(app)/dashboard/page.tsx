import { Authenticated } from '@/components/authenticated'
import { OrganizationLink } from '@/components/organization-link'
import { MentorFormStatus } from '@/components/mentor-form-status'
import { Role } from '@/lib/utils'
import { OrganizationList } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Box, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { MentorReferenceForms } from '@/components/mentor-reference-forms'

export default async function Home() {
	const user = await currentUser()
	const greeting = `Welcome to Mentore${user?.firstName ? ` , ${user.firstName}!` : '!'}`

	return (
		<main>
			<Container pt={{ initial: '4', md: '0' }}>
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
					<MentorFormStatus />
				</Authenticated>

				<Authenticated allowedRoles={[Role.Reference]}>
					<Heading as="h1" mb={'4'}>
						{greeting}
					</Heading>
					<Heading as="h2" size="2" mb={'2'}>
						References to Submit
					</Heading>
					<MentorReferenceForms />
				</Authenticated>

				<Authenticated allowedRoles={[Role.Admin]}>
					<Heading as="h1">Overview</Heading>
					<Grid columns={'2'} my={'4'} gap={'4'}>
						<Box>
							<OrganizationLink>Sign Up Form</OrganizationLink>
						</Box>
					</Grid>
				</Authenticated>

				<Authenticated allowedRoles={[Role.Mentor]}>
					<Heading as="h1">Overview</Heading>
				</Authenticated>
			</Container>
		</main>
	)
}
