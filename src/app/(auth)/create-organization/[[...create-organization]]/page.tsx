import { OrganizationButton } from '@/components/auth-buttons'
import { OrgControl } from '@/components/authenticated'
import { Icons } from '@/components/icons'
import { Box, Container, Flex, Heading, Section } from '@radix-ui/themes'

export default function Home() {
	return (
		<main>
			<Container px={'5'}>
				<Flex width={'100%'} py={'4'} align={'center'} justify={'between'}>
					<Box>
						<Icons.Logo />
					</Box>
				</Flex>
			</Container>
			<Section>
				<Container>
					<Heading as="h1" align={'center'} mb={'4'}>
						Select or Create an Organization
					</Heading>
					<Flex justify={'center'}>
						<OrgControl afterOrganizationUrl="/dashboard">
							<OrganizationButton />
						</OrgControl>
					</Flex>
				</Container>
			</Section>
		</main>
	)
}
