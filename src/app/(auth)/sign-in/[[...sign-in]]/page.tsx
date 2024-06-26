import { Icons } from '@/components/icons'
import { SignIn } from '@clerk/nextjs'
import { Box, Container, Flex, Section } from '@radix-ui/themes'

export default function Home() {
	return (
		<main>
			<Container px={'5'}>
				<Flex py={'4'} align={'center'} justify={'between'}>
					<Box>
						<Icons.Logo />
					</Box>
				</Flex>
			</Container>
			<Section>
				<Container>
					<Flex justify={'center'}>
						<SignIn />
					</Flex>
				</Container>
			</Section>
		</main>
	)
}
