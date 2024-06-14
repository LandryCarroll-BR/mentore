import { Authenticated } from '@/components/authenticated'
import { Role } from '@/lib/utils'
import { auth, currentUser } from '@clerk/nextjs/server'
import { Container, Heading } from '@radix-ui/themes'
import { Assessments } from '@/components/assessments'

export default async function AssessmentsPage() {
	const user = await currentUser()
	const session = auth()

	return (
		<main>
			<Container>
				<Authenticated allowedRoles={[Role.Admin]}>
					<Heading as="h1" mb={'4'}>
						Assessments
					</Heading>
					<Assessments />
				</Authenticated>
			</Container>
		</main>
	)
}
