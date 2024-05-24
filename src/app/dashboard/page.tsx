import { Authenticated } from '@/components/authenticated'
import { Role } from '@/lib/utils'
import { Box, Card, Container, Grid, Heading, Text } from '@radix-ui/themes'

export default function Home() {
	return (
		<main>
			<Container>
				<Heading as="h1">Overview</Heading>
				<Grid columns={'2'} my={'4'}>
					<Box gridColumnStart={'1'} gridColumnEnd={'3'}>
						<Authenticated allowedRoles={[Role.Mentor, Role.Admin]}>
							<Card>
								<Text>Hello Org</Text>
							</Card>
						</Authenticated>
					</Box>
				</Grid>
			</Container>
		</main>
	)
}
