import { OrgControl } from '@/components/authenticated'
import { Icons } from '@/components/icons'
import { CreateOrganization } from '@clerk/nextjs'
import { Box, Container, Flex, Section } from '@radix-ui/themes'

export default function Home() {
	return (
		<main>
			<Container>
				<Flex width={'100%'} py={'4'} align={'center'} justify={'between'}>
					<Box>
						<Icons.Logo />
					</Box>
				</Flex>
			</Container>
			<Section>
				<Container>
					<Flex justify={'center'}>
						<OrgControl afterCreateOrganizationUrl="/dashboard">
							<CreateOrganization />
						</OrgControl>
					</Flex>
				</Container>
			</Section>
		</main>
	)
}
