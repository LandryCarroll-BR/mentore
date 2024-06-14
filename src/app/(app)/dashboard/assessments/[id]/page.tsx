import { Text, Box, Button, Container, Flex, Heading, Section, Card } from '@radix-ui/themes'
import { Id } from '@/convex/_generated/dataModel'
import { Role } from '@/lib/utils'
import { Authenticated } from '@/components/authenticated'

type Params = { id: Id<'assessments'> }

export default async function AssessmentDetailsPage({ params }: { params: Params }) {
	return (
		<main>
			<Container>
				<Authenticated allowedRoles={[Role.Admin]}>
					<Heading as="h1" mb={'4'}>
						Assessments
					</Heading>
				</Authenticated>
			</Container>
		</main>
	)
}
