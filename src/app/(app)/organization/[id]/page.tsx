import { Icons } from '@/components/icons'
import { Text, Box, Button, Container, Flex, Heading, Section, Card } from '@radix-ui/themes'
import { fetchQuery } from 'convex/nextjs'
import Link from 'next/link'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { OrganizationSignUpform } from '@/components/organization-sign-up-form'

export async function generateStaticParams() {
	const organizations = await fetchQuery(api.organization.getAllOrganizations)
	return organizations.map((organization) => ({
		id: organization._id,
	}))
}

type Params = { id: Id<'organizations'> }

export default async function OrganizationDetailsPage({ params }: { params: Params }) {
	return (
		<main>
			<Container>
				<Flex py={'4'} px={'5'} align={'center'} justify={'between'}>
					<Link href={'/'}>
						<Box>
							<Icons.Logo />
						</Box>
					</Link>
					<Button asChild>
						<Link href="/dashboard">Dashboard</Link>
					</Button>
				</Flex>
			</Container>
			<Section>
				<Container mb={'6'}>
					<Flex align={'center'} justify={'center'} gap={'5'} direction={'column'} px={'5'}>
						<Box>
							<Box maxWidth={'580px'}>
								<Heading
									as="h1"
									align={'center'}
									size={{ initial: '8', sm: '9' }}
									mb={'4'}
									wrap={'balance'}
								>
									Join our community of change.
								</Heading>
								<Text as="p" align={'center'} size={{ initial: '3', sm: '4' }}>
									We believe in the power of connection and guidance. By becoming a mentor, you can
									play a pivotal role in someone&apos;s life journey.
								</Text>
							</Box>
						</Box>
					</Flex>
				</Container>
				<Container size={'1'} px={'5'}>
					<Card size={{ initial: '3', md: '5' }}>
						<OrganizationSignUpform organizationId={params.id} />
					</Card>
				</Container>
			</Section>
		</main>
	)
}
